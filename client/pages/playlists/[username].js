import client from '../../components/client'
import { gql, useMutation } from '@apollo/client'
import { Container, Typography, Box, Paper, Button, Avatar, Grid, Dialog, DialogContent, DialogTitle, TextField, DialogContentText, Stack} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import { useState } from 'react'
import cookie  from 'js-cookie'
import { useSelector } from 'react-redux'
import { selectUser } from '../../src/features/userSlice'
 

export async function getServerSidePaths() {

    const { data } =  await client.query({
        query: gql`
        query getAllUsers{
            getAllUsers{
                username  
                playlists  
            } 
        }
        `    
    })
    const users = data.getAllUsers
    users.map(user => console.log(user))
    const paths = users.map((user) => ({params: {username: user.username},}))
    return{        
        paths,
        fallback: false
    }
}

export async function getServerSideProps({params})
{

    const { data } =  await client.query({
        query: gql`
        query getUserPlaylists($author: String){
            getUserPlaylists(author: $author){
                title 
                id
                author      
            } 
        }        
        `, variables: {author: params.username}},)

    return{
        props: {
            playlists : data.getUserPlaylists
        }
    }
}

const ADD_PLAYLIST = gql`
    mutation addPlaylist($author: String, $title: String){
        addPlaylist(author: $author, title: $title){
            title
            author
        }        
    }
`
const LOGIN_USER_MUTATION = gql`
    mutation loginUser($password: String, $email: String){
      loginUser(password: $password, email: $email){
        email
        username
        password
        token
        }
    }
`


const userTracksPage = ({playlists}) => {

const [loginUser, {error, loading, data}] = useMutation(LOGIN_USER_MUTATION)
const [addPlaylist] = useMutation(ADD_PLAYLIST)

const [open, setOpen] = useState(false)
const [title, setTitle] = useState()
const currentUser = useSelector(selectUser)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

const router = useRouter()
const {username} = router.query

const addPlaylistHandler = () =>{
    addPlaylist({variables: {author: username, title: title}, onCompleted: ()=> {
        loginUser({variables: {password: currentUser.password, email: currentUser.email}, onCompleted: (data) =>{        
            cookie.set('auth-token', data.loginUser.token, {expires: 4/24}) 
            setTimeout(router.reload(), 5000)   
        }})        
    }})
}

return(
    <Layout>
        <Typography marginTop={12} align="center" variant="h3">Мои плейлисты</Typography>
            <Container width="lg" sx={{mt:8}}>
                <Box width='100%' sx={{mx:'auto'}}>
                    <Grid sx={{width: '100%'}} container margin={2} spacing={2} flexDirection='row'>                         
                        <Grid item marginTop={0}>
                            <Paper sx={{width: 200, height: 200, margin: 0}}>
                                <Button onClick={handleClickOpen} margin={0} sx={{width: 200, height: 200}} alignSelf='center' justifyItems='center'>
                                    <Add fontSize='large' color='secondary' sx={{width: 100, height: 100, sx:'auto', my: 'auto'}}/>  
                                </Button>
                            </Paper>  
                        </Grid> 
                            {playlists.map((playlist) => 
                            (<Grid item onClick={()=>{
                                router.push(`/playlist/${playlist.id}`)
                            }} >
                                <Avatar sx={{width: 200, height: 200}} className="avatar" variant='rounded'>{playlist.title}</Avatar>
                            </Grid>))
                            }   
                    </Grid>
                    <Dialog
                    open={open}
                    onClick={handleClose}
                    fullWidth
                    >
                        <DialogTitle>Создание плейлиста</DialogTitle>
                        <DialogContent>
                            <Stack alignItems='center' justifyContent='center'>
                                <DialogContentText justifySelf='center' sx={{mx: 3, my: 1}}>Введите название плейлиста</DialogContentText>                            
                                <TextField onChange={(e)=>{
                                    setTitle(e.target.value)                                    
                                }} label='Название плейлиста' autoFocus fullWidth variant='outlined' color='secondary' sx={{my:3, mx: 5}}></TextField>                               
                                <Button sx={{mx:'auto', width: 140}} variant='contained' color='secondary' onClick={addPlaylistHandler}>Добавить</Button>
                            </Stack>
                        </DialogContent>
                    </Dialog>
                </Box>
        </Container>
    </Layout>
)
}

export default userTracksPage


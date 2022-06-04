import client from '../../components/client'
import {gql} from '@apollo/client'
import { Container, List, ListItem, Typography, Box, Stack, Paper, IconButton, Button, Avatar, Grid} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'

export async function getStaticPaths() {

    const { data } =  await client.query({
        query: gql`
        query getAllUsers{
            getAllUsers{
                username    
            } 
        }
        `    
    })
    const users = data.getAllUsers
    const paths = users.map((user) => ({params: {username: user.username},}))
    return{        
        paths,
        fallback: false
    }
}

export async function getStaticProps({params})
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

const userTracksPage = ({playlists}) => {


const router = useRouter()
const {username} = router.query

return(
    <Layout>
        <Typography marginTop={12} align="center" variant="h3">Плейлисты пользователя {username}</Typography>
            <Container width="lg" sx={{mt:8}}>
                <Box width='100%'>
                    <Grid sx={{width: '100%'}} container spacing={2}>
                    {playlists.map((playlist) => 
                        (<Grid item>
                            <Stack>
                                <Avatar height={200} width={200} variant='square'>{playlist.title}</Avatar>
                            </Stack>
                        </Grid>))
                    }            
                        <Grid item alignItems='center' justifyItems='center' >
                            <IconButton onClick={()=>{}} variant='outlined' color='secondary' sx={{mx: 'auto', my: 'auto'}}>
                                    <Add fontSize='small' color='secondary' sx={{width: 200, height: 200}}/>                                       
                            </IconButton>
                            <Typography variant='h5' alignSelf='flex-end'>Добавить плейлист</Typography>                        
                        </Grid>      
                    </Grid>
                </Box>
        </Container>
    </Layout>
)
}

export default userTracksPage


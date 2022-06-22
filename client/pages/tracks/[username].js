import { Container, List, ListItem, Typography, Box, Stack, Paper, Button} from '@mui/material'
import { Favorite, FavoriteBorder, Add} from '@mui/icons-material'
import Layout from '../../components/Layout'
import client from '../../components/client'
import { gql } from '@apollo/client'
import Image from 'next/image'
import { useState } from 'react'
import {useRouter} from 'next/router'
import MusicPlayer from '../../components/player'
import AddTrackToPlaylist from '../../components/AddTrackToPlaylist'



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
        query getUerTracks($author: String){
            getUserTracks(author: $author){
                id
                image 
                name
                audio 
                author                      
            } 
        }        
        `, variables: {author: params.username}},)

    return{
        props: {
            tracks : data.getUserTracks
        }
    }
}



const userTracksPage = ({tracks}) => {

const router = useRouter()
const {username} = router.query

return(
    <Layout>
        <Typography marginTop={12} align="center" variant="h3">Треки пользователя {username}</Typography>
            <Container width="lg" sx={{mt:8}}>
                <Box width='100%'>
                    <List sx={{width: '100%'}}>
                        {tracks.map((track) => 
                        (<ListItem key={track.id}>
                            <Paper sx={{width:'100%'}} color='secondary'>
                                <Stack direction='row' alignItems='center' justifyItems='flex-start' sx={{width: '100%'}} margin={1} marginBottom={0}>
                                        <Box onClick={()=>{}}>
                                            <Image src={track.image} alt="Img" width="60" height="60"></Image>
                                        </Box>
                                        <Box flexDirection="row" alignSelf='center' marginLeft={3} flexGrow={1}>
                                                <Typography  fontSize={20} sx={{mb: '3px'}}>{track.name}</Typography>
                                                <Typography button onClick={()=>{}} fontSize={12} sx={{mt: '6px'}} color='primary.light'>{track.author}</Typography>
                                        </Box>
                                        <Stack spacing={1} direction='row' alignItems='center' marginRight={4}>
                                            <AddTrackToPlaylist {...track}/>
                                        </Stack>
                                </Stack>
                            </Paper>
                        </ListItem>))}
                    </List>
                </Box>
        </Container>
        <MusicPlayer/>
    </Layout>
)
}

export default userTracksPage
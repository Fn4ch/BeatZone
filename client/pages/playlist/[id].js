import client from '../../components/client'
import { gql } from '@apollo/client'
import { Container, Typography, Box, Paper, Button, List, ListItem, Stack, IconButton} from '@mui/material'
import { DeleteOutline } from '@mui/icons-material'
import Layout from '../../components/Layout'
import Image from "next/image"
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { trackList, trackIndex } from '../../src/features/playerSlice'
 

export async function getServerSidePaths() {

    const { data } =  await client.query({
        query: gql`
        query getPlaylists{
            getPlaylists{
                id
            }
        }
        `    
    })
    const playlists = data.getPlaylists.getPlaylists
    console.log(playlists)
    const paths = playlists.map((playlist) => ({params: {id: playlist.id},}))
    return{        
        paths,
        fallback: false
    }
}

export async function getServerSideProps({params})
{

    const { data } =  await client.query({
        query: gql`
        query getPlaylist($id: String){
            getPlaylist(id: $id){
                title
                track{
                    id
                    name
                    audio
                    image
                    author
                    description
                }
            }
        }`, variables: {id: params.id}
    })

    return{
        props: {
            playlist : data.getPlaylist
        }
    }
}

export default function PlaylistPage({playlist}){

    const tracks = playlist.track
    console.log(tracks)

    const router = useRouter()

    const dispatch = useDispatch()

    const [track, setTrack] = useState(null)


    useEffect(()=>{
        dispatch(trackList({
            tracks
        }
        ))
    },[])


    const [currentSongIndex,setCurrentSongIndex] = useState(0)

    useEffect(()=>{
        dispatch(trackIndex({
            currentSongIndex: currentSongIndex
        }))
    },[currentSongIndex])

    return(
        <Layout>
        <Typography marginTop={12} align="center" variant="h3">{playlist.title}</Typography>
            <Container width="lg" sx={{mt:8}}>
                <Box width='100%'>
                    <List sx={{width: '100%'}}>
                            {tracks.map((track, index) =>{
                                return(
                                <ListItem key={track.id}>
                                <Paper sx={{width:'100%'}} color='secondary'>
                                    <Stack direction='row' alignItems='center' justifyItems='flex-start' sx={{width: '100%'}} margin={1} marginBottom={0}>
                                            <Box onClick={()=>{
                                                setTrack(track)
                                                setCurrentSongIndex(index)
                                            }} key={track.id}>
                                                <Image src={track.image} alt="Img" width="60" height="60"></Image>
                                            </Box>
                                            <Box flexDirection="row" alignSelf='center' marginLeft={3} flexGrow={1}>
                                                    <Typography  fontSize={20} sx={{mb: '3px'}}>{track.name}</Typography>                                                    
                                                    <Typography button onClick={()=>{
                                                        router.push(`/user/${track.author}`)
                                                    }} fontSize={12} sx={{mt: '6px'}} color='primary.light'>{track.author}</Typography>
                                            </Box>
                                        </Stack>
                                    </Paper>
                                </ListItem>
                                )
                            })}                       
                    </List>
                </Box>
        </Container>
    </Layout>
    )
}
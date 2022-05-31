import Layout  from '../components/Layout'
import { gql } from "@apollo/client"
import client from '../components/client'
import { Container, List, ListItem, Typography, Box, Stack, Paper, Button} from '@mui/material'
import { Favorite, FavoriteBorder, Add} from '@mui/icons-material'
import Image from "next/image"
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { play , stop} from '../src/features/playerSlice'
import Player from '../components/player'


export async function getServerSideProps()
{
    const { data } =  await client.query({
        query: gql`
        query getAllTracks{
            getAllTracks{
                id
                author
                name
                image
                audio
            } 
        }
        `        
    })
    return{
        props: {
            tracks: data.getAllTracks
        }
    }
}

export default function tracksPage({tracks}){

const dispatch = useDispatch()

const [liked, setLiked] = useState(true)
const [track, setTrack] = useState(null)

const likeHandler = (e) =>{
    setLiked(!liked)
}

useEffect(()=>{
    if(track)
    dispatch(play({
        trackName: track.name,
        trackAuthor: track.author,
        trackImage: track.image,
        trackAudio: track.audio,
        trackPosition: 0,
        isPaused: true
    }
    ))
},[track])

    return(
        <Layout>
            <Typography marginTop={12} align="center" variant="h3">Треки</Typography>
            <Container width="lg" sx={{mt:8}}>
                <Box width='100%'>
                    <List sx={{width: '100%'}}>
                        {tracks.map((track) => 
                        (<ListItem key={track.id}>
                            <Paper sx={{width:'100%'}} color='secondary'>
                                <Stack direction='row' alignItems='center' justifyItems='flex-start' sx={{width: '100%'}} margin={1} marginBottom={0}>
                                        <Box onClick={()=>setTrack(track)} key={track.id}>
                                            <Image src={track.image} alt="Img" width="60" height="60"></Image>
                                        </Box>
                                        <Box flexDirection="row" alignSelf='center' marginLeft={3} flexGrow={1}>
                                                <Typography  fontSize={20} sx={{mb: '3px'}}>{track.name}</Typography>
                                                <Typography button onClick={()=>{}} fontSize={12} sx={{mt: '6px'}} color='primary.light'>{track.author}</Typography>
                                        </Box>
                                        <Stack spacing={1} direction='row' alignItems='center' marginRight={4}>
                                            <Button size='small'  color='inherit'>
                                                <Add fontSize='large'/>
                                            </Button>
                                            <Button size='small' color='inherit' onClick={likeHandler}>
                                                {liked ? <FavoriteBorder /> : <Favorite />}
                                            </Button>
                                        </Stack>
                                </Stack>
                            </Paper>
                        </ListItem>))}
                    </List>
                </Box>
        </Container>
        </Layout>
    )
}
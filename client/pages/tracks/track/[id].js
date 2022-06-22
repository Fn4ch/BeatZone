import { Container, List, ListItem, Typography, Box, Stack, Paper, Button} from '@mui/material'
import Layout  from '../../components/Layout'
import client from '../../components/client'
import MusicPlayer from '../../../components/player'
import { useDispatch } from 'react-redux'
import { useState, useEffect} from 'react'

export async function getServerSidePaths() {

    const { data } =  await client.query({
        query: gql`
        query getAllTracks{
            getAllTracks{
                id
            }
        }
        `    
    })
    const tracks = data.getAllTracks.getAllTracks
    console.log(playlists)
    const paths = tracks.map((id) => ({params: {id}}))
    return{        
        paths,
        fallback: false
    }
}

export async function getServerSideProps({params})
{

    const { data } =  await client.query({
        query: gql`
        query getTrack($id: String){
            getTrack(id: $id){
                    id
                    name
                    audio
                    image
                    author
                    description
                    comments{
                        id
                        author                        
                        message
                    }
            }
        }`, variables: {id: params.id}
    })

    return{
        props: {
            track : data.getTrack
        }
    }
}

const TrackPage = ({track}) =>{    

    const router = useRouter()

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(trackList({
            tracks: track
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
            <Typography marginTop={12} align="center" variant="h3">Треки</Typography>
                <Container width="lg" sx={{mt:8}}>
                    <Box width='100%'>
                            <Paper sx={{width:'100%'}} color='secondary'>
                                    <Stack direction='row' alignItems='center' justifyItems='flex-start' sx={{width: '100%'}} margin={1} marginBottom={0}>
                                            <Box onClick={()=>{
                                                setTrack(track)
                                                setCurrentSongIndex(0)
                                            }} key={track.id}>
                                                <Image src={track.image} alt="Img" width="200" height="200"></Image>
                                            </Box>
                                            <Box flexDirection="row" alignSelf='center' marginLeft={3} flexGrow={1}>
                                                    <Typography  fontSize={20} sx={{mb: '3px'}}>{track.name}</Typography>                                                    
                                                    <Typography button onClick={()=>{
                                                        router.push(`/user/${track.author}`)
                                                    }} fontSize={12} sx={{mt: '6px'}} color='primary.light'>{track.author}</Typography>
                                            </Box>
                                    </Stack>
                            </Paper>
                    </Box>
                </Container>
            <MusicPlayer/>
        </Layout>
        
    )
}

export default TrackPage
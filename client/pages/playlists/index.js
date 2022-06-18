import { Avatar, Container, Grid, Typography, Box} from '@mui/material'
import { gql } from '@apollo/client'
import client from '../../components/client' 
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'


export async function getServerSideProps()
{
    const { data } =  await client.query({
        query: gql`
        query getPlaylists{
            getPlaylists{
                id
                author
                title       
            } 
        }
        `        
    })
    return{
        props: {
            playlists: data.getPlaylists
        }
    }
}



const PlaylistsPage = ({playlists}) =>{

const router = useRouter()

    return(
        <Layout>
            <Container>
                <Typography variant='h2' marginTop={12} align='center'>Плейлисты</Typography>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'center'}}>                
                    <Grid container spacing={2} sx={{my:4}}>
                        {playlists.map((playlist)=>(
                            <Grid item key={playlist.id} onClick={()=>{
                                router.push(`/playlist/${playlist.id}`)
                            }}>
                                <Avatar sx={{height:200, width: 200}} className="avatar" fontSize='24' variant='rounded'>{playlist.title}</Avatar>
                                <Typography fontSize={12} align='center' marginTop={1}>{playlist.author}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Layout>
    )
}

export default PlaylistsPage
import { Avatar, Container, Grid} from '@mui/material'
import { gql } from '@apollo/client'
import client from '../../components/client' 

export async function getServerSideProps()
{
    const { data } =  await client.query({
        query: gql`
        query getPlaylists{
            getAllTracks{
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

console.log(playlists)

    return(
        <Container>
            <Grid container spacing={2}>
            {playlists.map((playlist)=>{
                    <Grid item onClick={()=>{}}>
                        <Avatar height='80' width='80' variant='square'>{playlist.title}</Avatar>
                    </Grid>
                })}
            </Grid>
        </Container>
    )
}

export default PlaylistsPage
import { Avatar, Container, Grid} from '@mui/material'
import { gql } from '@apollo/client'
import client from '../../components/client' 
import Layout from '../../components/Layout'


export async function getServerSideProps()
{
    const { data } =  await client.query({
        query: gql`
        query getPlaylists{
            getPlaylists{
                author
                title
                Track{
                    name
                }             
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
        <Layout>
            <Container>
                <Grid container spacing={2}>
                {playlists.map((playlist)=>{
                        <Grid item onClick={()=>{}}>
                            <Avatar height='80' width='80' variant='square'>{playlist.title}</Avatar>
                            <Typography>{playlist.title}</Typography>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </Layout>
    )
}

export default PlaylistsPage
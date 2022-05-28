import Layout  from '../components/Layout'
import { gql } from "@apollo/client"
import client from '../components/client'
import { Container, List, ListItem, Typography, Box } from '@mui/material'
import { Favorite, FavoriteBorder } from '@mui/icons-material'
import Image from "next/image"


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
const liked = false


    return(
        <Layout>
            <Container width="lg" sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', mt:20}}>
                <Box>
                    <List>
                        {tracks.map((track) => 
                        (<ListItem>
                            <Box width="md" display='flex'>
                                    <Box margin="10">
                                        <Image src={track.image} alt="Img" width="100" height="100"></Image>
                                    </Box>
                                    <Box flexDirection="row" justifySelf='flex-end' margin="10">
                                        <Typography variant="h5">{track.author}</Typography>
                                        <Typography variant="h5">{track.name}</Typography>
                                    </Box>
                                    <Box flexGrow='1'>
                                        {liked ? <FavoriteBorder/> : <Favorite/> }
                                    </Box>
                                </Box>
                        </ListItem>))}
                    </List>
                </Box>
        </Container>
        </Layout>
    )
}
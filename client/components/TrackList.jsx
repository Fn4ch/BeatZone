import { Favorite, FavoriteBorder } from '@mui/icons-material'
import {List, Container, Box, ListItem, Typography} from '@mui/material'
import {gql} from '@apollo/client'


const GET_USERS = gql`
query getAllTracks{
    getAllTracks{
        id
        author
        name                
    } 
}
`
/*
const { data } =  await client.query({
    query: gql`
    query getAllTracks{
        getAllTracks{
            id
            author
            name                
        } 
    }
    `        
})
*/

//const {data, loading, error} = useQuery(GET_USERS ,{onCompleted: ()=> {console.log(data)}})


const TrackList = ({tracks}) =>{  

console.log(tracks)
const liked = false

/*
const obama = tracks.map(track =>(
    <ListItem key={track.id}>
    <Box width="lg" display='flex'>
        <Box margin="10">
            <Image src={TrackList.image} alt="Img" width="100" height="100"></Image>
        </Box>
        <Box flexDirection="row" margin="10">
            <Typography variant="h5">{track.author}</Typography>
            <Typography variant="h5">{track.name}</Typography>
        </Box>
        <Box flexGrow='1'>
            {liked ? <FavoriteBorder/> : <Favorite/> }
        </Box>
    </Box>
</ListItem>
))
*/


    return(
        <Container width="lg" sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <List>
               
            </List>
        </Container>
    )
}

export default TrackList
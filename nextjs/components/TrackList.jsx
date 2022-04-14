import { Favorite, FavoriteBorder } from '@mui/icons-material'
import {List, Container, Box, ListItem, Typography} from '@mui/material'

const TrackList = () =>{


const Track = track.map(<ListItem>
    <Box width="lg" display='flex'>
        <Box margin="10">
            <Image src="" alt="Img" width="100" height="100"></Image>
        </Box>
        <Box flexDirection="row" margin="10">
            <Typography variant="h5">{track.Author}</Typography>
            <Typography variant="h5">{track.Name}</Typography>
        </Box>
        <Box flexGrow='1'>
            {liked ? <FavoriteBorder/> : <Favorite/> }
        </Box>
    </Box>
</ListItem>)

    return(
        <>
            <Container width="lg" sx={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <List>
                    {Track}
                </List>
            </Container>
        </>
    )
}

export default TrackList
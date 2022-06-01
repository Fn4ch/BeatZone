import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'
import { mutation, gql } from '@apollo/client'


const addTrackToPlaylist = ({props}) =>{

    const ADD_TRACK_TO_PLAYLIST = gql`
    {
        mutation addTrackToPlaylist($author: String, $title: String, $track: Track){
            addTrackToPlaylist($author: $author,title: $title, track: $track)
            {
                author
                title
                track
            }
        }
    }
    `

    return(
        <Box>
            <Add />
        </Box>
    )
}

export default addTrackToPlaylist
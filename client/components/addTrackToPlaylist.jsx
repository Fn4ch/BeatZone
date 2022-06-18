import { Add } from '@mui/icons-material'
import { Box, MenuItem, Menu, IconButton } from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import cookie from 'js-cookie'
import { useSelector } from 'react-redux'
import { selectUser } from '../src/features/userSlice'
import { playerSlice } from '../src/features/playerSlice'


const AddTrackToPlaylist = (props) =>{    

    const ADD_TRACK_TO_PLAYLIST = gql`
        mutation addTrackToPlaylist($trackId: String, $playlistId: String){
            addTrackToPlaylist(trackId: $trackId, playlistId: $playlistId)
            {
                title
            }            
        }
    `    
    
    const currentUser = useSelector(selectUser)    
    const [addTrackToPlaylist, {data}] = useMutation(ADD_TRACK_TO_PLAYLIST)

    const [anchorEl, setAnchorEl] = useState()
    const [playlists, setPlaylists] = useState()

    const open = Boolean(anchorEl)

    useEffect(()=>{
        console.log(currentUser)
        if(currentUser){
            const p = currentUser.playlists
            setPlaylists(p.map(playlist => (<MenuItem key={playlist.id} id={playlist.id} onClick={()=>{addTrackHandler(playlist._id)}} >{playlist.title}</MenuItem>)))
        }
    },[currentUser])


    const handleClick = (e) => {
        setAnchorEl(e.currentTarget) 
    }
    
    const handleClose = () => {
        setAnchorEl(null)
    }

    const addTrackHandler = (playlist) => {
       addTrackToPlaylist({variables: {trackId: props.id, playlistId : playlist}, onCompleted: (data)=>{
        handleClose()
        alert(`Трек добавлен в плейлист ${data.addTrackToPlaylist.title}`)
        console.log(data)
    }})
    }

    return(
        <>
            <IconButton onClick={handleClick}>
                <Add />
            </IconButton>
            <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            >
                {playlists}
            </Menu>
        </>
    )
}

export default AddTrackToPlaylist
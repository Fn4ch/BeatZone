import { DockRounded, Menu } from '@mui/icons-material'
import { SwipeableDrawer, List, ListItem, ListItemText, Box, Divider, Switch, FormControlLabel, Stack, Avatar, Typography, getStepLabelUtilityClass} from '@mui/material'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { logout } from '../src/features/userSlice'
import jwt_decode from 'jwt-decode'
import { login, playlists} from '../src/features/userSlice'
import { gql, useQuery } from '@apollo/client'


export default function MenuDrawer(){


    const [open, setOpen] = useState(false)    

    const router = useRouter()

    const dispatch = useDispatch()

    const [username, setUsername] = useState()

    useEffect(()=>{
        const token = cookie.get('auth-token')
        if(token){
            const decoded = jwt_decode(token)
            setUsername(decoded.data.username)
            cookie.set('playlists', decoded.data.playlists, {expires: 2/24})
            dispatch(
                login({
                username: decoded.data.username,
                email: decoded.data.email,
                image: decoded.data.image,
                password: decoded.data.password,
                playlists: decoded.data.playlists,
                loggedIn: true
                }
            ))            
        }
    }, [])

    
    return(
        <>
            <Menu onClick={() => setOpen(true)} color='secondary' fontSize='large'/>
            <SwipeableDrawer
                anchor="right"
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <Box
                 textAlign="center"
                >
                </Box>
                <Divider
                    color={"primary.light"}
                />
                <List width='auto' sx={{mx:3}}>
                    <ListItem button onClick={()=>{}} >
                        <Stack direction="row" spacing={2} alignItems='center'>
                            <Avatar src="" variant='rounded' sx={{width: 50, height: 50}}></Avatar>
                            <Typography variant='h5'>{username}</Typography>
                        </Stack>
                    </ListItem>
                    <ListItem button onClick={() =>{ router.push(`/user/${username}`)}}>
                        <ListItemText primary={'Профиль'}/>
                    </ListItem>
                    <ListItem button onClick={() =>{ router.push(`/tracks/${username}`)}}>
                        <ListItemText primary={'Мои треки'}/>
                    </ListItem>
                    <ListItem button onClick={() =>{router.push(`/playlists/${username}`)}}>
                        <ListItemText primary={'Мои плейлисты'}/>
                    </ListItem>
                    <ListItem  button onClick={() =>{}}>
                        <ListItemText primary={'Настройки'}/>
                    </ListItem>
                   <ListItem >
                      <FormControlLabel labelPlacement="end" label="Тема" control={<Switch/>}/>
                   </ListItem>
                   <ListItem button onClick={() =>{
                        cookie.remove('auth-token')
                        dispatch(logout())
                        router.push('/authorize')
                    }}>
                       <ListItemText >Выход</ListItemText>
                   </ListItem>
                </List>
            </SwipeableDrawer>
        </>
    )
}
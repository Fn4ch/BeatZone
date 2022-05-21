import { Menu } from '@mui/icons-material'
import { SwipeableDrawer, List, ListItem, ListItemText, Box, Divider, Switch, FormControlLabel, Stack, Avatar, Typography} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { logout } from '../src/features/userSlice'

export default function MenuDrawer(){


    const [open, setOpen] = useState(false)

    let username = 'artur'

    const router = useRouter()

    const dispatch = useDispatch()
    
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
                    <ListItem button onClick={() =>{ router.push('/profile')}}>
                        <ListItemText primary={'Профиль'}/>
                    </ListItem>
                    <ListItem button onClick={() =>{ router.push(`/${user}/tracks`)}}>
                        <ListItemText primary={'Треки'}/>
                    </ListItem>
                    <ListItem button onClick={() =>{router.push(`/${user}/playlists}`)}}>
                        <ListItemText primary={'Плейлисты'}/>
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
                        router.push('login')
                    }}>
                       <ListItemText >Выход</ListItemText>
                   </ListItem>
                </List>
            </SwipeableDrawer>
        </>
    )
}
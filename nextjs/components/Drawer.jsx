import { Menu } from '@mui/icons-material'
import { SwipeableDrawer, List, ListItem, ListItemText, Box, Divider, Switch, FormControlLabel, Stack, Avatar, Typography} from '@mui/material'
import { useState } from 'react'
import Image from 'next'

export default function MenuDrawer(){


    const [open, setOpen] = useState(false)

    let avatar
    let username = 'user'
    
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
                    width={"400"}
                    color={"primary.light"}
                />
                <List width='auto' sx={{mx:3}}>
                    <ListItem>
                        <Stack direction="row" spacing={2} alignItems='center'>
                            <Avatar alt={{avatar}} src=""></Avatar>
                            <Typography variant='h5'>{username}</Typography>
                        </Stack>
                    </ListItem>
                    <ListItem button onClick={() =>{}}>
                        <ListItemText primary={'Трэки'}/>
                    </ListItem>
                    <ListItem button onClick={() =>{}}>
                        <ListItemText primary={'Понравилось'}/>
                    </ListItem>
                    <ListItem  button onClick={() =>{}}>
                        <ListItemText primary={'Настройки'}/>
                    </ListItem>
                    <ListItem >
                      <FormControlLabel labelPlacement="right" label="Тема" control={<Switch/>}/>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </>
    )
}
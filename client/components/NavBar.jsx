import { Box, InputAdornment, TextField, ThemeProvider, Typography, IconButton, Badge, Stack} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Search, UploadFile }  from '@mui/icons-material'
import { Notifications}  from '@mui/icons-material'
import MenuDrawer from './Drawer'
import Link from '../src/Link'
import { useSelector } from 'react-redux'
import { selectUser } from '../src/features/userSlice'
import { useRouter } from 'next/router'



export default function NavBar(){


  return(
      <AppBar position="fixed" color='transparent'>
          <Toolbar sx={{display: 'flex', alignItems:'center'}}>
            <Link href="/">
                <Typography variant="h4" color="secondary">BeatZone</Typography>
            </Link>
                <Box flexGrow={1} display='flex' flexDirection='row'>
                  <TextField
                    sx={{mx:3, visibility: {sm:'hidden', xs:'hidden', md:'visible', lg:'visible'}}}
                    id='searchField'
                    variant='outlined'
                    size='small'
                    label='Search'
                    color='secondary'
                    
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search htmlColor='#fff'/>
                        </InputAdornment>
                      ),}}    
                  />
                  <Link href="/tracks">
                    <Typography variant="h5" color="secondary">Tracks</Typography>
                  </Link>
                </Box>                
                <Stack direction='row' alignItems='center' spacing={2} >
                  <Box sx={{visibility: {sm:'hidden', xs:'hidden', md:'visible', lg:'visible'}}}>
                    <Link href='/upload'>
                      <UploadFile color='secondary' fontSize='large'/>
                    </Link>
                  </Box>     
                  <IconButton >
                    <MenuDrawer />
                  </IconButton>
                </Stack> 
          </Toolbar>
      </AppBar>
  )
}
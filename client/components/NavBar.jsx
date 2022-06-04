import { Box, Typography, IconButton, Badge, Stack} from '@mui/material'
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
          <Toolbar sx={{display: 'flex', alignItems:'center',mx:1}}>
            <Link href="/" className='link' >
                <Typography variant="h4" color="secondary">BeatZone</Typography>
            </Link>
                <Box display='flex' flexDirection='row' sx={{mx:2, display: {sm:'none', xs:'none', md:'contents', lg:'contents'}}} >                  
                  <Link href="/tracks" className='link' sx={{ml:4}}>
                    <Typography variant="h5" color="#ffffff" >Tracks</Typography>
                  </Link>
                  <Link href='/playlists' className='link' sx={{ml:4}}>
                    <Typography variant='h5' color='#ffffff'>Плейлисты</Typography>
                  </Link>
                </Box>
                <Box flexGrow={1} ></Box>                
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Box sx={{visibility: {sm:'hidden', xs:'hidden', md:'visible', lg:'visible'}}}>
                    <Link href='/upload'>
                      <UploadFile color='secondary' fontSize='large'/>
                    </Link>
                  </Box>     
                  <IconButton>
                    <MenuDrawer />
                  </IconButton>
                </Stack> 
          </Toolbar>
      </AppBar>
  )
}
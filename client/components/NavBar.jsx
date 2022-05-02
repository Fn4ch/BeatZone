import { Box, InputAdornment, TextField, ThemeProvider, Typography, IconButton, Badge, Stack} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Search, UploadFile }  from '@mui/icons-material'
import { Notifications}  from '@mui/icons-material'
import MenuDrawer from './Drawer'
import Link from '../src/Link'
import Upload from '../components/Upload'


export default function NavBar(){


  return(
      <AppBar position="fixed" color='transparent'>
          <Toolbar sx={{display: 'flex', alignItems:'center'}}>
            <Link href="/">
                <Typography variant="h4" color="secondary">BeatZone</Typography>
            </Link>
                <Box flexGrow={1}>
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
                </Box>
                <Stack direction='row'>
                  <Box sx={{visibility: {sm:'hidden', xs:'hidden', md:'visible', lg:'visible'}}}>
                    <Upload/>
                  </Box>     
                  <IconButton >
                    <MenuDrawer />
                  </IconButton>
                </Stack> 
          </Toolbar>
      </AppBar>
  )
}
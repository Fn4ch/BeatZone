import { Box, InputAdornment, TextField, ThemeProvider, Typography, IconButton, Badge} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Search, UploadFile }  from '@mui/icons-material'
import { Notifications}  from '@mui/icons-material'
import MenuDrawer from './Drawer'
import AccountMenu from './AccountMenu'
import Link from '../src/Link'
import Upload from '../components/Upload'


export default function NavBar(){


  return(
      <AppBar position="fixed" color='primary'>
          <Toolbar sx={{display: 'flex', alignItems:'center'}}>
            <Link href="/">
                <Typography variant="h4" color="secondary">BeatZone</Typography>
            </Link>
                <Box color='secondary'>
                  <TextField
                    sx={{mx:3}}
                    variant='outlined'
                    size='small'
                    label='Search'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search htmlColor='#fff'/>
                        </InputAdornment>
                      ),}}                
                    
                  />
                </Box>
                <Box sx={{flexGrow: 1}}/>
                <Box sx={{display:{xs:'none', md:'flex', mr: 3}}}>
                  <IconButton >
                      <Badge badgeContent={4} color='secondary'>
                        <Notifications fontSize='large' color='secondary' />
                      </Badge>
                  </IconButton>

                  <Upload/>            

                  <IconButton >
                    <MenuDrawer />
                  </IconButton>
                </Box> 
          </Toolbar>
      </AppBar>
  )
}
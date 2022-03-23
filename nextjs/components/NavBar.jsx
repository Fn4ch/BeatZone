import { Box, InputAdornment, TextField, ThemeProvider, Typography, IconButton, Badge} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Search }  from '@mui/icons-material'
import { Notifications}  from '@mui/icons-material'
import MenuDrawer from './Drawer'
import AccountMenu from './AccountMenu'


export default function NavBar(){

  return(
      <AppBar position="fixed" color='primary'>
          <Toolbar>
                <Typography variant="h4">BeatZone</Typography> 
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
                <Box sx={{display:{xs:'none', md:'flex', mr: 20}}}>
                  <IconButton >
                      <Badge badgeContent={4} color='secondary'>
                        <Notifications fontSize='large' color='secondary' />
                      </Badge>
                    </IconButton>
                <AccountMenu/>
                  <IconButton >
                    <MenuDrawer />
                  </IconButton>
                </Box> 
          </Toolbar>
      </AppBar>
  )
}
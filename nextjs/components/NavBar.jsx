import { Box, InputAdornment, TextField, ThemeProvider, Typography, IconButton, Badge, Container, Button,} from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Search }  from '@mui/icons-material'
import { Notifications}  from '@mui/icons-material'
import MenuDrawer from './Drawer'
import AccountMenu from './AccountMenu'

export default function NavBar(){

    
  return(
      <AppBar position="fixed" >
          <Toolbar>
            <ThemeProvider>  
                <Typography>BeatZone</Typography>          
                <TextField 
                    sx={{ml: 4}}
                    variant="standard"
                    id="seach_field"
                    label="Search"
                    color="secondary"
                    autoFocus="true"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search/>
                        </InputAdornment>
                      ),}}
                />
                <Box sx={{flexGrow: 1 }}/>
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
            </ThemeProvider>    
          </Toolbar>
      </AppBar>
  )
}
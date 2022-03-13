import * as React from 'react'
import Image from 'next'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import myTheme from '../components/myTheme'
import { ThemeProvider } from '@mui/material'
import { TextField, InputAdornment} from '@mui/material'
import { Search } from '@mui/icons-material'
import grey from '@mui/material/colors'


export default function Index() {  


  return (
    <>
      <ThemeProvider theme={myTheme}>
        <Container maxWidth="sm" color='primary'>
          <NavBar position='fixed'/>
            <Box sx={{ my: 10}} position='center' >
              <Typography sx={{mt:15, ml:1}} align="left" variant='h1'>Место для</Typography>
                <Container maxWidth="200" color="#ffffff">
                  <TextField 
                        sx={{my: 3, md: 10}}
                        variant="standard"
                        id="seach_field"
                        label="Search"
                        color="secondary"
                        fullWidth="true"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search/>
                            </InputAdornment>
                          ),}}
                  />
                </Container>
              <Typography align="right" sx={{mr:1}} variant='h1'>Музыки</Typography>
            </Box>
          <Copyright />
          <Footer/>
        </Container>
      </ThemeProvider>
    </>
  )
}

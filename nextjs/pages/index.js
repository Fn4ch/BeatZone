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
import theme from '../src/theme'
import { ThemeProvider } from '@mui/material'
import { TextField, InputAdornment} from '@mui/material'
import { Search } from '@mui/icons-material'
import grey from '@mui/material/colors'
import back from '../src/back.jpg'


export default function Index() {  
  
  const lazyRoot = React.useRef(null)
  return (
    <>
      <ThemeProvider theme={theme}>
          <NavBar/>
        <Container maxWidth="lg" color='primary' position='center'>
              <img
                lazyRoot={lazyRoot}
                src={back}
                alt="Picture of the author"
                width={800}
                height={500}
              />
              <Typography sx={{mt:15, ml:1}} align="left" variant='h1'>Место для</Typography>
                <Box sx={{mx:"auto"}} maxWidth="sm">
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
                </Box>
              <Typography align="right" sx={{mr:1}} variant='h1'>Музыки</Typography>
          <Copyright />
          <Footer/>
        </Container>
      </ThemeProvider>
    </>
  )
}

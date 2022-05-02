import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright'
import theme from '../src/theme'
import { ThemeProvider } from '@mui/material'
import { TextField, InputAdornment} from '@mui/material'
import { Search } from '@mui/icons-material'
import Player from '../components/player'
import Layout from '../components/Layout'
import Image from 'next/image'
import backImage from '../src/pictures/mountains.jpg'

export default function Index() {  

  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Box sx={{zIndex: -2, height: 1/3, maxHeight: 1/3}}>
          <Image
              src={backImage}
              alt="Picture of the authore"
              layout='responsive'
              height={1080}
            />
          </Box>
          <Container maxWidth="lg" sx={{borderRight:'5px, solid, #fff842', borderLeft:'5px, solid, #fff842'}} position='center'>
            <Box sx={{mt:5}}></Box>            
              <Typography sx={{mt:10, ml:1}} align="left" variant='h1'>Место для</Typography>
                <Box sx={{mx:"auto"}} maxWidth="sm">
                  <TextField 
                      sx={{my: 3, md: 10}}
                      variant="standard"
                      id="seach_field"
                      label="Search"
                      color="secondary"
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                              <Search/>
                            </InputAdornment>
                        ),}}
                  />
                </Box>
              <Typography align="right" sx={{mr:1}} variant='h1'>Музыки</Typography>              
          </Container>
        </Layout> 
        <Player/>
      </ThemeProvider>
    </>
  )
}

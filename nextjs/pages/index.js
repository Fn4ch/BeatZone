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
import grey from '@mui/material/colors'
import Player from '../components/player'
import Layout from '../components/Layout'
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Index() {  

  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <Container maxWidth="lg" sx={{borderRight:'5px, solid, #fff842', borderLeft:'5px, solid, #fff842'}} position='center'>
            <Box sx={{mt:5}}></Box>
            <Image
              loader={myLoader}
              src="\src\pictures\mountains.jpg"
              alt="Picture of the author"
              width={500}
              height={500}
            />
              <Typography sx={{mt:10, ml:1}} align="left" variant='h1'>Место для</Typography>
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
          </Container>
        </Layout> 
        <Player/>
      </ThemeProvider>
    </>
  )
}

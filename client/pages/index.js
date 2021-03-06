import * as React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import theme from '../src/theme'
import { ThemeProvider } from '@mui/material'
import { Button } from '@mui/material'
import { Search } from '@mui/icons-material'
import Layout from '../components/Layout'
import Image from 'next/image'
import backImage from '../src/pictures/mountains.jpg'
import {useRouter} from 'next/router'

export default function Index(props) { 
    
  const router = useRouter()
  
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>  
              <Image
                src={backImage}
                alt="Picture of the authore"
                layout='intrinsic'
                height={1200}       
                className="pic"        
              />
          <Container maxWidth='xl' sx={{mt:{xs:0,sm:0,md:-20,lg:-26,xl:-32}, zIndex:5}}>
            <Container maxWidth="lg" position='center'>
              <Box sx={{mt:5}}></Box>            
                <Typography sx={{mt:10, ml:1}} align="left" variant='h1'>Место для</Typography>
                  <Box sx={{mx:"auto"}} maxWidth="sm">
                    <Button
                        sx={{my: 10, md: 10, paddingY: 1}}
                        variant='outlined'
                        color="secondary"                        
                        fullWidth
                        fontSize={40}
                        onClick={()=>{router.push('/tracks')}}
                    >Перейти к трекам</Button>
                  </Box>
                <Typography align="right" sx={{mr:1}} variant='h1'>Музыки</Typography>              
            </Container>
          </Container>
        </Layout> 
      </ThemeProvider>
    </>
  )
}

import Typography from '@mui/material/Typography'
import ThemeProvider from '@mui/material'
import Container from '@mui/material'
import NavBar from '../components/NavBar'
import * as React from 'react'
import Footer from '../components/Footer'


export default function userPage() {

    return(
    <>
        <ThemeProvider>
            <NavBar/>
            <Container>
                <Typography align="center" variant="h2">Профиль
                </Typography>
            </Container>
            <Footer/>
        </ThemeProvider>
    </>
    )
}
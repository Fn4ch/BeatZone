import * as React from 'react';
import LoginIn from '../components/Authorize';
import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import NavBar from '../components/NavBar'

const Auth = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar/>
        <LoginIn/>
      </ThemeProvider>
    </>
  )
}

export default Auth

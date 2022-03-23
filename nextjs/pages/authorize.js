import * as React from 'react';
import {Box, Container} from '@mui/material'
import Auth from '../components/Auth'
import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import NavBar from '../components/NavBar';

const AuthReg = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar/>
        <Auth/>
      </ThemeProvider>
    </>
  )
}

export default AuthReg

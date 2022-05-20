import * as React from 'react';
import LoginIn from '../components/Authorize';
import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'

const Auth = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
          <LoginIn/>
      </ThemeProvider>
    </>
  )
}

export default Auth

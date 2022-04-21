import * as React from 'react';
import LoginIn from '../components/Authorize';
import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import Layout from '../components/Layout'

const Auth = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <LoginIn/>
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default Auth

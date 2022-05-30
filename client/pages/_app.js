import * as React from 'react'
import { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import { ApolloProvider } from '@apollo/client'
import '../components/_app.css'
import cookie from 'js-cookie'
import store from '../src/app/store'
import { Provider, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import { UserContext } from '../components/user'
import client from '../components/client'



const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps} = props

  const [user, setUser] = useState(null)
  
  const router = useRouter()

  useEffect(() => {    
     //Here goes the logic of retrieving a user
    const token = cookie.get('auth-token')
    if(!token){
      router.push('/authorize')
    }
    else{
      const decoded = jwt_decode(token)
      console.log(decoded.data)      
    }    

  }, [])

  if (pageProps.protected && !user) {
    return <Layout>Loading...</Layout>
  }

  
  return (
    <ApolloProvider client={client}>
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <UserContext.Provider value={user}>        
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />              
            <Component {...pageProps} />
          </ThemeProvider>
        </UserContext.Provider>
      </Provider>      
    </CacheProvider>  
    </ApolloProvider>     
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

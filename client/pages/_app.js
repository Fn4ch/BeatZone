import * as React from 'react'
import { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import { ApolloProvider, InMemoryCache, HttpLink, from} from '@apollo/client'
import {ApolloClient, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error"
import '../components/_app.css'
import cookie from 'js-cookie'
import store from '../src/app/store'
import { Provider, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import jwt_decode from 'jwt-decode'
import { UserContext } from '../components/user'



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
      console.log(decoded)      
    }    

  }, [])

  if (pageProps.protected && !user) {
    return <Layout>Loading...</Layout>
  }

  const httpLink = new HttpLink({
    uri: 'http://localhost:5000/graphql'
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
      if (networkError) console.log(`[Network error]: ${networkError}`);
    })
  
  const authLink = setContext((_, { headers }) => {
  const token = cookie.get('auth-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
  })



  const client = new ApolloClient({
    link: authLink.concat(from([errorLink, httpLink]))  ,
    cache: new InMemoryCache(),
    credentials: 'include',
  })



  return (
    
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <UserContext.Provider value={user}>
        <ApolloProvider client={client}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline />              
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
        </UserContext.Provider>
      </Provider> 
    </CacheProvider>  
     
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

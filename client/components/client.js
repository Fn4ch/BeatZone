import { InMemoryCache, HttpLink, from} from '@apollo/client'
import {ApolloClient, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error"
import cookie from 'js-cookie'

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

  export default client
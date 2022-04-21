import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import Register from '../components/Register'
import { ApolloProvider } from '@apollo/client/react/context'
import Layout from '../components/Layout'

const RegPage = () => {
    
    return(
        <ApolloProvider>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Register/>
                </Layout>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default RegPage
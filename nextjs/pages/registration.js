import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import NavBar from '../components/NavBar'
import SignUp from '../components/SignUp'
import { ApolloProvider } from '@apollo/client/react/context'

const RegPage = () => {
    
    return(
        <ApolloProvider>
            <ThemeProvider theme={theme}>
                <NavBar/>
                <SignUp/>
            </ThemeProvider>
        </ApolloProvider>
    )
}

export default RegPage
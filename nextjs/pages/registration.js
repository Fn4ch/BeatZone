import { ThemeProvider } from '@mui/material'
import theme from '../src/theme'
import NavBar from '../components/NavBar'
import SignUp from '../components/signUp'

const RegPage = () => {
    return(
        <ThemeProvider theme={theme}>
            <NavBar/>
            <Sign/>
        </ThemeProvider>
    )
}

export default RegPage
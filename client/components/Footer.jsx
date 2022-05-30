import {Box, Typography, Container} from '@mui/material'

const Footer = () => {

    return(
        <Container>
            <Box flexGrow={1} height='100%'></Box>
            <Box sx={{ display:'flex' , justifyContent:'center', alignSelf: 'bottom'}}>
            <Typography align="justify">Fnach</Typography>
            </Box>
        </Container>
    )
}

export default Footer
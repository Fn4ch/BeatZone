import * as React from 'react';
import LoginIn from '../components/Login'
import Register from '../components/Register'
import { Switch, Container, Box, Typography, Stack} from '@mui/material'
import { useState } from 'react'



const Auth = () => {

  const [checked, setChecked] = useState(false)

  return (
    <Container maxWidth="lg" sx={{mt:8, display:'flex', justifyContent:'center'}}>
      <Box maxWidth="sm" width="xs" sx={{my: 10}} >
        <Stack width='sm' spacing={8} direction='row' alignItems='center' justifyContent='center'>
          {checked ? <Typography color='light' variant="h3" align="center" sx={{my:4}}>Регистрация</Typography>
            : <Typography color='light' variant="h3" align="center" sx={{my:4}}>Авторизация</Typography> }          
          <Switch checked={checked} color='secondary' onChange={(e) => setChecked(e.target.checked)} label={checked ? 'Регистрация' : 'Авторизация'}/>
        </Stack>
        {checked ? <Register/> : <LoginIn/>}        
      </Box>
    </Container>
  )
}

export default Auth

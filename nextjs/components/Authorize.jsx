import {useState} from 'react'
import { TextField, Typography, Button, Container, Box, InputAdornment, IconButton, FormControl, FilledInput, InputLabel, FormHelperText} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

function LoginIn(){

  const [values, setValues] = useState({
      username : '',
      password : '',
      showPassword: false
    })
            
      const changeHandler = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value})
        console.log(values)
      }

  const loginHandler = () =>{

  }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

return(
        <> 
        <Container maxWidth="lg" sx={{mt:20}}>
            <Box maxWidth="40%" sx={{mx:'auto', my: 10}} justifyItems="center" >
              <Typography color='light' variant="h2" align="center" sx={{my:4}}>Авторизация</Typography>

                <FormControl sx={{my:4}}  fullWidth="true" color='secondary'> 
                  <InputLabel  >Email</InputLabel>
                  <FilledInput
                      id='username'
                      fullWidth='true'
                      onChange={changeHandler('username')}
                  />
                </FormControl>

              <FormControl sx={{my:4}}  fullWidth="true" color='secondary'>
                <InputLabel >Password</InputLabel>
                <FilledInput
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={changeHandler('password')}
                  fullWidth="true"                  
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color='primary'
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

            <Box sx={{my:5, mx:'auto'}} maxWidth="50%">
                <Button sx={{mx:'auto'}} fullWidth="true" variant="outlined" onClick={loginHandler} color='secondary'>Войти</Button>
            </Box>
          </Box>          
        </Container>
        </>
    )
}
export default LoginIn
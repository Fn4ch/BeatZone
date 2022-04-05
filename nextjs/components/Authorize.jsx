import {useState} from 'react'
import { TextField, Typography, Button, Container, Box, InputAdornment, IconButton, FormControl, FilledInput, InputLabel, FormHelperText} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import Link from '../src/Link'
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
        <Container maxWidth="lg" sx={{mt:10, display:'flex', justifyContent:'center'}}>
            <Box maxWidth="sm" width="xs" sx={{my: 10}} >
              <Typography color='light' variant="h2" align="center" sx={{my:4}}>Авторизация</Typography>

                <FormControl sx={{my:4}}  fullWidth="true" color='secondary'> 
                  <InputLabel>Email</InputLabel>
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

            <Box display="flex" alignContent="center">
                <Typography  fontSize="24" color='secondary' sx={{ml:'auto', mr:3}}>Всё ещё нет аккаутна?</Typography><Box sx={{mr:'auto'}}><Link href="/registration">Зарегистрироваться</Link></Box>
            </Box> 
          </Box>          
        </Container>
        </>
    )
}
export default LoginIn
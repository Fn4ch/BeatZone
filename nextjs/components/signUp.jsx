import { useState } from "react"
import { TextField, Typography, Button, Container, Box, InputAdornment, IconButton, FormControl, FilledInput, InputLabel, FormHelperText} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'

export default function SignUp(){

  const [values, setValues] = useState({
    username : '',
    email : '',
    password : '',
    passwordRepeat : '',
    showPassword : false
  })
        
  const changeHandler = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value})
    console.log(values)
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

const registerHandler = () =>{
    
}
    return(
    <>
        <Container maxWidth="lg" sx={{mt:20}}>
          <Box maxWidth="40%" sx={{mx:'auto', my:10}} justifyItems="center" >
            <Box sx={{my:5}} >
              <Typography color='light' variant="h2" align='center'>Регистрация</Typography>
            </Box>

            <FormControl sx={{my:4}}  fullWidth="true" color='secondary'> 
                  <InputLabel  >Email</InputLabel>
                  <FilledInput
                      id='username'
                      fullWidth='true'
                      onChange={changeHandler('email')}
                  />
            </FormControl>

            <FormControl sx={{my:4}}  fullWidth="true" color='secondary'> 
                  <InputLabel  >username</InputLabel>
                  <FilledInput
                      id='username'
                      fullWidth='true'
                      onChange={changeHandler('username')}
                  />
            </FormControl>

            <FormControl sx={{my:4}}  fullWidth="true" color='secondary'>
                <InputLabel >Пароль</InputLabel>
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

              <FormControl sx={{my:4}}  fullWidth="true" color='secondary'>
                <InputLabel>Повторите пароль</InputLabel>
                <FilledInput
                  id="passwordRepeat"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.passwordRepeat}
                  onChange={changeHandler('passwordRepeat')}
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
                <Button variant="outlined" sx={{mx:'auto'}} fullWidth="true" onClick={registerHandler} color='secondary'>Зарегистрироваться</Button>
            </Box>  
          </Box>
        </Container>
    </>
    )
}
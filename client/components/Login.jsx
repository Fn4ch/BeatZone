import {useState} from 'react'
import { Button, Box, InputAdornment, IconButton, FormControl, FilledInput, InputLabel } from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import {useMutation, gql} from '@apollo/client'
import { useRouter } from 'next/router'
import Error from './ErrorMessage'
import cookie from 'js-cookie'

function LoginIn(){


  const router = useRouter()

  const LOGIN_USER_MUTATION = gql`
    mutation loginUser($password: String, $email: String){
      loginUser(password: $password, email: $email){
        email
        username
        password
        token
      }
      }
    `
    const [loginUser, {error, loading, data}] = useMutation(LOGIN_USER_MUTATION)
    if(error){
    Error(error, true)
  }

  const [values, setValues] = useState({
    email : '',
    password : '',
    showPassword: false
  })


            
  const changeHandler = (prop) => (event) => {
    setValues({...values, [prop]: event.target.value})
  }  

  const handleClickShowPassword = (e) => {
  e.preventDefault()
  setValues({
    ...values,
    showPassword: !values.showPassword,
  })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const loginHandler = async (e) =>{
    e.preventDefault()
      await loginUser({variables: {password: values.password, email: values.email}, onCompleted: (data) =>{
        
        cookie.set('auth-token', data.loginUser.token, {expires: 4/24})

        router.push('/')
      }})
  }

  return(
        <>     
            <FormControl sx={{my:3}}  fullWidth color='secondary'> 
                  <InputLabel>Email</InputLabel>
                  <FilledInput
                      id='email'
                      fullWidth
                      type='email'
                      onChange={changeHandler('email')}
                  />
            </FormControl>

              <FormControl sx={{my:3}}  fullWidth color='secondary'>
                <InputLabel >Password</InputLabel>
                <FilledInput
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={changeHandler('password')}
                  fullWidth                  
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        tabIndex={-1}
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
                <Button sx={{mx:'auto'}} variant="contained" fullWidth onClick={loginHandler} color='secondary'>Войти</Button>
            </Box>
        </>
    )
}
export default LoginIn
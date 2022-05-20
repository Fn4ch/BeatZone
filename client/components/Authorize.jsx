import {useState} from 'react'
import { TextField, Typography, Button, Container, Box, InputAdornment, IconButton, FormControl, FilledInput, InputLabel, FormHelperText} from '@mui/material'
import { VisibilityOff, Visibility, TryOutlined } from '@mui/icons-material'
import Link from '../src/Link'
import {useMutation, gql} from '@apollo/client'
import { useRouter } from 'next/router'
import Error from './ErrorMessage'
import cookie from 'js-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../src/features/userSlice'

function LoginIn(){

  const dispatch = useDispatch()

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
        
        cookie.set('auth-token', data.loginUser.token, {expires: 12/24})

        dispatch(login({
          username : data.loginUser.username,
          email: data.loginUser.email,
          password: data.loginUser.password,
          loggedIn: true
        }))

        router.push('/')
      }})
  }

  return(
        <> 
        <Container maxWidth="lg" sx={{mt:10, display:'flex', justifyContent:'center'}}>
            <Box maxWidth="sm" width="xs" sx={{my: 10}} >
              <Typography color='light' variant="h2" align="center" sx={{my:4}}>Авторизация</Typography>

                <FormControl sx={{my:4}}  fullWidth={true} color='secondary'> 
                  <InputLabel>Email</InputLabel>
                  <FilledInput
                      id='email'
                      fullWidth={true}
                      type='email'
                      onChange={changeHandler('email')}
                  />
                </FormControl>

              <FormControl sx={{my:4}}  fullWidth={true} color='secondary'>
                <InputLabel >Password</InputLabel>
                <FilledInput
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={changeHandler('password')}
                  fullWidth={true}                  
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
                <Button sx={{mx:'auto'}} variant="contained" fullWidth={true} onClick={loginHandler} color='secondary'>Войти</Button>
            </Box>

            <Box display="flex" alignContent="center">
                <Typography  fontSize="24" color='secondary.light' sx={{ml:'auto', mr:3}}>Всё ещё нет аккаутна?</Typography><Box sx={{mr:'auto'}}><Link href="/registration" >Зарегистрироваться</Link></Box>
            </Box> 
          </Box>          
        </Container>
        </>
    )
}
export default LoginIn
import { useState } from "react"
import { TextField, Typography, Button, Container, Box, InputAdornment, IconButton, FormControl, FilledInput, InputLabel, FormHelperText, Alert} from '@mui/material'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import Link from '../src/Link'
import {useMutation, gql} from '@apollo/client'
import { useRouter } from 'next/router'

 export default function Register(){ 
  
  const router = useRouter()

  const [values, setValues] = useState({
    showPassword : false
  })

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  

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
  const CREATE_USER_MUTATION = gql`
    mutation createUser($username: String, $password: String, $email: String){
      createUser(username: $username, password: $password, email: $email) 
      }
    `


    const [createUser, {error, loading, data}] = useMutation(CREATE_USER_MUTATION)
    
    const registerHandler = async (e) => {
      e.preventDefault()
      await createUser({variables: {username, password, email}})
      router.push('/loginIn')
    }
  


  return(
    <>     
            <FormControl sx={{my:3}}  fullWidth color='secondary'> 
                  <InputLabel >Email</InputLabel>
                  <FilledInput
                      id='email'
                      fullWidth
                      onChange={ e => setEmail(e.target.value)}
                  />
            </FormControl>
            <FormControl sx={{my:3}}  fullWidth color='secondary'> 
                  <InputLabel>username</InputLabel>
                  <FilledInput
                      id='username'
                      fullWidth
                      onChange={ e => setUsername (e.target.value)}                      
                  />
            </FormControl>

            <FormControl sx={{my:3}}  fullWidth color='secondary'>
                <InputLabel >Пароль</InputLabel>
                <FilledInput
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={ e => setPassword(e.target.value)}
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

              <FormControl sx={{my:3}}  fullWidth color='secondary'>
                <InputLabel>Повторите пароль</InputLabel>
                <FilledInput
                  id="passwordRepeat"
                  type={values.showPassword ? 'text' : 'password'}
                  value={passwordRepeat}
                  onChange={ e => setPasswordRepeat(e.target.value)}
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
                    <Button variant="contained" color='secondary' fullWidth onClick={(e) => registerHandler(e)} >Зарегистрироваться</Button>
              </Box>
    </>
  )
}

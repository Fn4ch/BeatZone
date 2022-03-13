import React,{useState, useContext} from 'react'
import './Auth.css'
import axios from 'axios'
import {AuthContext} from '../context/AuthContext'
import { response } from 'express'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Grid, GridItem, TextField, Typography, Button} from '@material-ui/core'
import { createTheme, makeStyles} from '@material-ui/styles'

function Auth(){
    const [form, setForm] = useState({
        username : '',
        password : ''
      })
      
      const {login} = useContext(AuthContext)
      
      const changeHandler = (event) => {
        setForm({...form,[event.target.name]: event.target.value})
        console.log(form)
      }

      const loginHandler = async () => {
        await axios.post('/login', {...form},
            {
              headers : {
                'Content-Type': 'application/json'
              }
            }).then(res=> {login(response.data.token, response.data.userId)})
            .catch(error=>console.log(error))
          }

      const registerHandler = async () => {
        await axios.post('/registration', {...form},
            {
              headers : {
                'Content-Type': 'application/json'
              }
            }).then(res=>console.log(res))
            .catch(error=>console.log(error))
          }

       const theme = createTheme({
    palette: {
      primary: {
        light: '#ffffff',
        main: '#eceff1',
        dark: '#babdbe',
        contrastText: '#000000',
      },
      secondary: {
        light: '#4f5b62',
        main: '#263238',
        dark: '#000a12',
        contrastText: '#ffffff',
      },
    },
  });


return(
    <BrowserRouter>
    <Switch>        
        <Route path="/login">
          <Grid fixed>
          <GridItem>
            <Typography color='textPrimary'>Авторизация</Typography>
          </GridItem>
          <GridItem>
            <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Логин' size='small' fullWidth='100'>
            </TextField>
          </GridItem>
          <GridItem>
            <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Пароль' size='small' fullWidth='100'>
            </TextField>
          </GridItem>
          <Button onClick={loginHandler} color='secondary'>Войти</Button>
          </Grid>
        </Route>
          

      <Route path="/registration">
          <Grid fixed>
          <GridItem>
            <Typography color='textPrimary'>Регистрация</Typography>
          </GridItem>
          <GridItem>
            <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Логин' size='small' fullWidth='100'>
            </TextField>
          </GridItem>
          <GridItem>
            <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Пароль' size='small' fullWidth='100'>
            </TextField>
          </GridItem>
          <Button onClick={registerHandler} color='secondary'>Зарегистрироваться</Button>
          </Grid>
      </Route>
    </Switch>
    </BrowserRouter>
    )
}
export default Auth
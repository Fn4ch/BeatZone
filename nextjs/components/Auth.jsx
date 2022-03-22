import {useState} from 'react'
import { Grid, TextField, Typography, Button, Container} from '@mui/material'
import { createTheme} from '@mui/material'
import Paper from '@mui/material/Paper'
import { experimentalStyled as styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Auth(){
    const [form, setForm] = useState({
        username : '',
        password : ''
      })
            
      const changeHandler = (event) => {
        setForm({...form,[event.target.name]: event.target.value})
        console.log(form)
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

  const loginHandler = () =>{

  }
  const registerHandler = () =>{
    
  }

return(
        <> <Container maxWidth="sm">
            <Grid fixed>
            <Item>
            <Typography color='primary' variant="h2">Авторизация</Typography>
            </Item>
            <Item>
              <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Логин' size='small' fullWidth='100'>
              </TextField>
            </Item>
            <Item>
              <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Пароль' size='small' fullWidth='100'>
              </TextField>
            </Item>
            <Button onClick={loginHandler} color='secondary'>Войти</Button>
          </Grid>
               
          <Grid fixed>
            <Item>
              <Typography color='primary' variant="h2">Регистрация</Typography>
            </Item>
            <Item>
              <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Логин' size='small' fullWidth='100'>
              </TextField>
            </Item>
            <Item>
              <TextField onChange={changeHandler} id="filled-search" variant='outlined' label='Пароль' size='small' fullWidth='100'>
              </TextField>
            </Item>
            <Button onClick={registerHandler} color='secondary'>Зарегистрироваться</Button>
          </Grid>
          </Container>
        </>
    )
}
export default Auth
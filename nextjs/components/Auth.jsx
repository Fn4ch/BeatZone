import {useState} from 'react'
import { Grid, TextField, Typography, Button, Container, Box} from '@mui/material'
import Paper from '@mui/material/Paper'
import { experimentalStyled as styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#babdbe' : '#333333',
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

  const loginHandler = () =>{

  }
  const registerHandler = () =>{
    
  }

return(
        <> 
        <Container maxWidth="sm">
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
              <Box sx={{my:2}}>
                <Button sx={{justifySelf:'center'}} variant="outlined" onClick={loginHandler} color='secondary'>Войти</Button>
              </Box>
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
              <Box  >
                <Button variant="outlined" sx={{my:2}} onClick={registerHandler} color='secondary'>Зарегистрироваться</Button>
              </Box>
          </Grid>
          </Container>
        </>
    )
}
export default Auth
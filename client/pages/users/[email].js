import {Typography, Grid, TextField, Avatar, Container, Button, Stack} from '@mui/material'
import Layout from '../../components/Layout'
import { useState } from 'react'



export default function userPage(props) {

    const [values, setValues] = useState({
       username: 'Artur',
       email: '4urek@mail.ru'
    })

    const changeHandler = (prop) => (e) =>{
        setValues({...values, [prop]: e.target.value})
    }

    return(
    <>
        <Layout>
            <Typography marginTop={10} align="center" variant="h2">Личный кабинет</Typography>
            <Container position='center' maxWidth='sm' sx={{my:5}}>
                <Grid container spacing={5} direction='column'>
                    <Grid item>
                        <Stack direction='row' alignItems='center'>
                            <Avatar variant='rounded' sx={{width: 100, height: 100, mr: 5}}></Avatar>
                            <Typography variant='h3'>{values.username}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth={true} value={values.username} onChange={changeHandler('username')}></TextField>
                    </Grid>
                    <Grid item >
                        <TextField fullWidth={true} value={values.email} onChange={changeHandler('email')}></TextField>
                    </Grid>
                    <Grid item xs={6} md={6} position='center'>
                        <Button fullWidth={true} color='secondary' variant='contained' >Сохранить изменения</Button>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    </>
    )
}
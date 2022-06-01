import {Typography, Grid, TextField, Avatar, Container, Button, Stack} from '@mui/material'
import Layout from '../../components/Layout'
import { useState } from 'react'
import Player from '../../components/player'
import client from '../../components/client'
import { gql } from '@apollo/client'

export async function getStaticPaths() {
    const { data } =  await client.query({
        query: gql`
        query getAllUsers{
            getAllUsers{
                username
            } 
        }
        `    
    })
    const users = data.getAllUsers
    const paths = users.map((user) => ({params: {username: user.username},}))
    return{        
        paths,
        fallback: false
    }
}

export async function getStaticProps({params})
{

    const { data } =  await client.query({
        query: gql`
        query getUser($username: String){
            getUser(username: $username){
                email
                username                         
            } 
        }        
        `, variables: {username: params.username}},)

    return{
        props: {
            user : data.getUser
        }
    }}



export default function userPage({user}) {

    const [values,setValues] = useState({
        username : '',
        email: ''
    })


    const changeHandler = (prop) => (e) =>{
        setValues({...values, [prop]: e.target.value})
    }

    return(
    <>
        <Layout>
            <Typography marginTop={10} align="center" variant="h2">Профиль</Typography>
            <Container maxWidth='sm' sx={{my:5}}>
                <Grid container spacing={5} direction='column'>
                    <Grid item>
                        <Stack direction='row' alignItems='center'>
                            <Avatar variant='rounded' sx={{width: 100, height: 100, mr: 5}}></Avatar>
                            <Typography variant='h3'>{user.username}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth={true} id='username' value={user.username} onChange={changeHandler('username')}></TextField>
                    </Grid>
                    <Grid item >
                        <TextField fullWidth={true} id='email' value={user.email} onChange={changeHandler('email')}></TextField>
                    </Grid>
                    <Grid item xs={6} md={6} position='center'>
                        <Button fullWidth={true} color='secondary' variant='contained' ></Button>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
        <Player/>
    </>
    )
}
import {useMutation, ApolloProvider , InMemoryCache, gql} from '@apollo/client'
import {Box, Button, FormControl} from '@mui/material'


 const RegisterUser = (username, password, email) => {

    const registerMutation = gql`
    mutation RegisterUser($username: String!, $password: String!, $email: String!) {
    registerUser(input: { username: $username, password: $password, email: $email}){
            username
            password
            email
        }
    }`


    const [registerUser, {data, loading, error}] = useMutation(registerMutation)

    if(loading) return 'Submitting...'
    if(error) return `'Submition error!' ${error.message}`

}
export default RegisterUser

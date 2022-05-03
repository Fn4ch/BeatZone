import {List, ListItem, Typography} from '@mui/material'
import {gql, useQuery} from '@apollo/client'

const GET_USERS = gql`
    {
    getAllUsers {
        email
        password
        username
        }
    }
    `

export default function usersPage(){
    const {loading, error, data} = useQuery(GET_USERS) 
    
    console.log(data)

    return(
        <>
            <List>
                <Typography></Typography>
            </List>
        </>
    )
}
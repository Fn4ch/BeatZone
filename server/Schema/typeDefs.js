import { gql, AuthenticationError, ApolloServer } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import guid from 'guid'
import registerInput from './users'

const typeDefs = gql`
    #Types 
    type User{
        email: String!
        username: String!
        password: String!
        playlist : [Playlist]
        role: [Role]
    } 

    type Role {
        value: String!
    }

    type Track {
        title : String!
        author : String!
        description : String!
        tags : String
        audio : String!
        duration: Float
        comment : String
    }
    
    type Playlist {
        title : String!
        Track : [Track!]!
        author : String!
    }

    #Queries
    type Query{ 
        todos : [String!]
                
        getAllUsers : [User!]!
        
        getAllTracks : [Track!]!

        getUser(id : ID!) : User
    }
    #Inputs
    input RegisterInput{
        username: String
        password: String
        email : String
    }
    
    input LoginInput{
        email: String
        password: String
    }

    #Mutations
    type Mutation{
        registerUser(registerInput: RegisterInput) : User

        loginUser(loginInput: LoginInput) : User

        addTrack(title: String, author: String, decription: String!, audio: String) : Track

        deleteTrack(ID: String): Track

        addPlaylist(title : String, Track: String, author: String): Playlist
    }

`
module.exports = typeDefs
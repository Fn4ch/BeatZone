const { gql, AuthenticationError, ApolloServer } = require('apollo-server-express')

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

        getUserTracks(author: ID) : Track
    }
    #Inputs
    input createUserInput{
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
        createUser(createUserInput: createUserInput) : User

        loginUser(loginInput: LoginInput) : User

        addTrack(title: String, author: String, decription: String!, audio: String) : Track

        deleteTrack(ID: String): Track

        addPlaylist(title : String, Track: String, author: String): Playlist
    }

`
module.exports = typeDefs
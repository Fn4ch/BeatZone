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

        getAllUsers : [User!]!
        
        getAllTracks : [Track!]!

        getUser(id : ID!) : User

        getUserTracks(author: ID!) : [Track!]!
    }
    #Inputs
    input createUserInput{
        username: String
        password: String
        email : String
    }
    
    input loginInput{
        email: String
        password: String
    }

    input addTrackInput{
        title: String!
        author : ID
        description: String
        audio: String
        image: String
    }

    #Mutations
    type Mutation{
        createUser(createUserInput: createUserInput) : String

        loginUser(loginInput: loginInput) : String

        addTrack(addTrackInput: addTrackInput) : Track

        deleteTrack(ID: String): Track

        addPlaylist(title : String, Track: String, author: String): Playlist
    }

`
module.exports = typeDefs
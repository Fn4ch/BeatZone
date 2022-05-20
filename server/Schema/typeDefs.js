const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type User{
        id: ID
        email: String!
        username: String!
        password: String!
        playlist: [Playlist]
        image: String
        role: [Role]
        token: String
    } 


    type Role {
        id: ID
        value: String!
    }

    type Track {
        id: ID
        title: String!
        author: String!
        description: String!
        tags: String
        likes: Int
        audio: String!
        comment: String
    }
    
    type Playlist {
        id: ID
        title: String!
        Track: [Track!]!
        author: String!
    }

    #Queries
    type Query{ 

        getAllUsers: [User]
        
        getAllTracks: [Track!]!

        getUser(id: ID!) : User

        getUserTracks(author: ID!) : [Track!]!
    }
    #Inputs
    input createUserInput{
        username: String
        password: String
        email: String
    }
    
    input loginInput{
        email: String
        password: String
    }

    #Mutations
    type Mutation{
        createUser(username: String, password: String, email: String) : User
        
        loginUser(password: String, email: String) : User

        addTrack(name: String!, author: String, description: String, audio: String, image: String) : Track 

        deleteTrack(ID: String): Track

        addPlaylist(title: String, Track: String, author: String): Playlist
    }

`
module.exports = typeDefs
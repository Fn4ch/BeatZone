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

    type Comment{
        id: ID
        message: String
        author: User
    }

    type Role {
        id: ID
        value: String!
    }

    type Track{
        id: ID
        name: String
        author: String
        description: String
        tags: String
        likes: Int
        image: String
        audio: String
        comment: [Comment]
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
        
        getAllTracks: [Track]

        getUser(username: String) : User

        getUserTracks(author: String) : [Track]

        getPlaylists: [Playlist]
    }

    #Mutations
    type Mutation{
        createUser(username: String, password: String, email: String) : User
        
        loginUser(password: String, email: String) : User

        addTrack(name: String, author: String, description: String, audio: String, image: String) : Track 

        deleteTrack(ID: String): Track

        addPlaylist(title: String, author: String): Playlist

        addTrackToPlaylist(title: String, Track: String, author: String): Playlist
    }

`
module.exports = typeDefs
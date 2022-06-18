const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type User{
        id: ID
        email: String!
        username: String!
        password: String!
        playlists: [Playlist]
        image: String
        role: [Role]
        token: String
    } 

    type Comment{
        id: ID
        comment: String
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
        comments: [Comment]
    }
    
    type Playlist {
        id: ID
        title: String!
        track: [Track]
        author: String
    }

    #Queries
    type Query{ 

        getAllUsers: [User]

        getTracks: [Track]
        
        getAllTracks: [Track]

        getUser(username: String) : User

        getUserTracks(author: String) : [Track]
        
        getUserPlaylists(author: String) : [Playlist]

        getPlaylists: [Playlist]
        
        getPlaylist(id: String): Playlist
        
        getTrack: Track
    }

    #Mutations
    type Mutation{
        createUser(username: String, password: String, email: String) : User
        
        loginUser(password: String, email: String) : User

        addTrack(name: String, author: String, description: String, audio: String, image: String) : Track 

        deleteTrack(ID: String): Track

        addPlaylist(title: String, author: String): Playlist

        addTrackToPlaylist(trackId: String, playlistId: String): Playlist

        addComment(author: String, comment: String): Comment
    }

`
module.exports = typeDefs
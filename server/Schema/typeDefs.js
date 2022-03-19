const { gql } = require('apollo-server-express')

const typeDefs = gql`
    #Types
    type User{
        id: ID!     
        username: String!
        password: String!
        playlist : [Playlist]
        role: [Role]
    } 


    type Role {
        id : ID!
        value: String!
    }

    type Track {
        id : ID!
        title : String!
        author : ID!
        description : String!
        tags : String
        audio : String!
        duration: Float
        comment : String
    }
    
    type Playlist {
        id : ID!
        title : String!
        Track : [Track!]!
        author : ID!
    }

    #Queries
    type Query{ 
        getAllUsers : [User!]!
        
        getAllTracks : [Track!]!

        getUser(id : ID!) : User!
    }

    #Mutations
    type Mutation{
        addUser(username: String, password: String) : User

        addTrack(title: String, author: String, decription: String!, audio: String) : Track

        deleteTrack(ID: String): Track

        addPlaylist(title : String, Track: String, author: String): Playlist
    }

`
module.exports = typeDefs
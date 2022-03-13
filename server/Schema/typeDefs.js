const { gql } = require('apollo-server-express')

const typeDefs = gql`
    #Types
    type User{
        Id: ID        
        username: String!
        password: String!
        playlist : [Playlist]
        role: [Role]
    } 


    type Role {
        Id: ID
        value: String!
    }

    type Track {
        Id : ID
        title : String!
        author : ID!
        description : String!
        tags : String!
        audio : String!
        duration: double
        comment : String
    }
    
    type Playlist {
        Id : ID
        title : String!
        Track : [Track]
    }

    #Queries
    type Query{ 
        getAllUsers: [User!]!
        
        getAllTracks : [Track!]!

        getUser($id: ID!) : [User]

        getUserTracks(author : $author) : User {
            Id
        }
    }

    #Mutations
    type Mutation{
        addUser(role: String, username: String, password: String): User!    
        
        addTrack(title: String, author: ID, description: String, tag: String, audio: String, image: String) : Track!

        deleteTrack(id : ID)
    }

`
module.exports = typeDefs
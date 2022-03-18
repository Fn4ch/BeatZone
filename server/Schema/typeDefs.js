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
        tags : String!
        audio : String!
        duration: Float
        comment : String
    }
    
    type Playlist {
        id : ID!
        title : String!
        Track : [Track!]!
    }

    #Queries
    type Query{ 
        getAllUsers : [User!]!
        
        getAllTracks : [Track!]!

        getUser(id : ID!) : User!
    }

`
module.exports = typeDefs
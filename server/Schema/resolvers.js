const mongoose = require('mongoose')
const User = require('../models/user')
const Track = require('../models/track')

const resolvers = {
    Query: {
        getAllUsers: async () => {        
            return await User.find()            
        },
        getAllTracks : async () => {
            return await Track.find()
        },
        getUser : async () =>{
            return await Track.findById(id)
        }
    },
    /* Mutation: {
        addUser: async (parent, args, context , info) => {
            const user = new User({args})
            await user.save()
            return user
        },
        addTrack : async (parent, args) => {
            const track = new Track({args})
            await track.save()
            return track
        },
        deleteTrack : async (parent, args) => {
            await Track.findByIdAndDelete(args)
            await save()
            return Track
     }
    }*/
}

module.exports  = resolvers
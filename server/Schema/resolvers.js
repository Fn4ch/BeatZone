const mongoose  = require('mongoose')
const User  = require('../models/user')
const Track  = require('../models/track')
const Playlist  = require('../models/playlist')
const { ApolloError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
        todos: async() => {
            return await []
        },
        getAllUsers: async () => {        
            return await User.find()            
        },
        getAllTracks : async () => {
            return await Track.find()
        },
        getUser : async (_, ID) =>{
            return await Track.findById(ID)
        },
        getUserTracks : async (_, ID) =>{
            return await Track.findById(ID)
        }
    },
    Mutation: {
        registerUser: async (_,{registerInput: {username, password, email}}) =>
        {
            const oldUser = await User.findOne({email})

            if(oldUser)
            throw new ApolloError('Пользователь с таким email уже зарегистрирован:' + email,'USER_ALREADY_EXISTS')

            let encryptedPassword = await bcrypt.hash(password, 10)

            const newUser = new User({
                username: username,
                email: email.toLowercase(),
                passwrod: encryptedPassword
            })

            const token = jwt.sign({user_id: newUser._id,email}, "UNSAFE_STRING", {expiresIn: "24h"})

            newUser.token = token

            const res = await newUser.save()
            return{
                id: res.id,
                ...res._doc
            }        
        },
        loginUser: async (parent, {loginInput:{email, password}}) =>{
            const user = await User.findOne({email})

            if(user && (await bcrypt.compare(password, user.password))){
                const token = jwt.sign({user_id: newUser._id,email}, "UNSAFE_STRING", {expiresIn: "24h"})
                user.token = token
                return{
                id: user.id,
                ...user._doc
                }
            }
            else{
                throw new ApolloError('Неправильный пароль', 'INCORRECET_PASSWORD')
            }

        },
        addTrack : async (parent, args, context, ifo) => {
            const track = new Track({args})
            await track.save()
            return track
        },
        deleteTrack : async (parent, args) => {
            await Track.findByIdAndDelete(args)
            await save()
            return Track
        },
        addPlaylist : async (parent, args) => {
            const playlist = new playlist({args})
            await save()
            return Playlist
        }
    }
}

module.exports  = resolvers
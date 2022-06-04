const mongoose  = require('mongoose')
const User  = require('../models/user')
const Track  = require('../models/track')
const Playlist  = require('../models/playlist')
const { ApolloError, AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { cookieParser } = require('cookie-parser')
const { cookie } = require('cookie')

const JWT_SECRET = process.env.JWT_SECRET || "secret"


const resolvers = {
    Query: {     

        getAllUsers: async (_, _args) => {
            return await User.find()         
        },

        getAllTracks : async (_, _args, context) => {
            console.log(context)
            return await Track.find()
        },

        getUser : async (_, {username}, context) =>{
            console.log(context)
            return await User.findOne({username})
        },

        getUserTracks : async (_, {author}, context) => {
            return await Track.find({author: author})
        },

        getPlaylists : async (_, _args)=>{
            return await Playlist.find()
        },

        getUserPlaylists : async (_, {author}, context) => {
            return await Playlist.find({author: author})
        },

        getTrack : async (_, {id}, context) =>{
            return await Track.findOne({_id : id})
        }
    },
    Mutation: {
        createUser: async (_,{username, password, email}) =>
        {
            const oldUser = await User.findOne({email})
            const oldUser2 = await User.findOne({username})
            if(oldUser2)
            throw new ApolloError('Пользователь с таким именем уже зарегистрирован:' + username, 'USER_ALREADY_EXSISTS')
            if(oldUser)
            throw new ApolloError('Пользователь с таким email уже зарегистрирован:' + email,'USER_ALREADY_EXISTS')
            else{
                email = email.toLowerCase()
                const newUser = new User({
                    email,
                    username,
                    password
                })
                await newUser.save()            
            }
            return newUser
        }, 
        loginUser: async (parent, {password, email}, context) =>{    
            
            const user = await User.findOne({email})
            if(!user)
                throw new ApolloError(`Пользователя с почтой ${email} не существует`)
            else{                    
                  if(user.password === password && user.email === email){
                    const token = jwt.sign({data: user}, JWT_SECRET, {expiresIn: "24h"})
                    user.token = token
                    return user                            
                } else throw new AuthenticationError('Некорректные данные для входа')
            }
        },    
        addTrack : async (parent, data, context) => {
            const track = new Track({
                name: data.name,
                description: data.description,
                audio: data.audio,
                image: data.image,
                author: data.author
            })
            await track.save()
            return track
        },
        deleteTrack : async (parent, args) => {
            const track = await Track.findOneAndDelete()
            await save()
            return track
        },
        addPlaylist : async (parent, {author, title}, context) => {
            const user = await User.findOne({author})
            const playlist = new Playlist({title, author})
            user.playlist += playlist
            await playlist.save()
            await user.save()
            return playlist
        },
        addTrackToPlaylist: async (parent, {title, author, Track}, context) => {
           const currentPlaylist = await Playlist.find({title: title})
            currentPlaylist.Track = Track
            currentPlaylist.title = title
            await currentPlaylist.save()
            return currentPlaylist
        },
        addComment: async (_, {comment, author, trackId}, context) =>{
            const track = await Track.findOne({trackId})
            const newComment = new Comment({comment, author})
            track.comments += comment
            await comment.save()
            await track.save()
        }
    }
}

module.exports  = resolvers
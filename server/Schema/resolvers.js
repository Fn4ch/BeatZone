const mongoose  = require('mongoose')
const User  = require('../models/user')
const Track  = require('../models/track')
const Playlist  = require('../models/playlist')
const { ApolloError, AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
var cloudinary = require('cloudinary').v2;
const {GraphQLUpload} = require('graphql-upload')
const { finished } = require('stream')


const JWT_SECRET = process.env.JWT_SECRET || "secret"

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME , 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  })


function makeRandom(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


const resolvers = {
    Upload: GraphQLUpload,
    Query: {     

        getAllUsers: async (_, _args, context) => { 
           /* const email = context.email
            const user = await User.findOne({email}) 
        if(user == null)
        {
            throw new AuthenticationError('Некорректные данные')
        }
        else{*/
                return await User.find()
            //}            
        },

        getAllTracks : async (_, _args, context) => {
            return await Track.find()
        },

        getUser : async (_, ID, context) =>{
            return await Track.findById({_id: ID})
        },

        getUserTracks : async (_, author, context) =>{
            return await Track.findById(author)
        }
    },
    Mutation: {
        createUser: async (_,{username, password, email}) =>
        {
            const oldUser = await User.findOne({email})

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
            return jwt.sign({data: {email, password}}, JWT_SECRET, {expiresIn: "4h"})} 
        }, 
        loginUser: async (parent, {password, email}) =>{    
            
            const user = await User.findOne({email})
            if(!user)
            throw new ApolloError(`Пользователя с почтой ${email} не существует`)
            else{                    
                if(user.password === password && user.email === email){
                    return jwt.sign({data: {email, password}}, JWT_SECRET, {expiresIn: "4h"})
                }
                    else
                    throw new AuthenticationError('Некорректные данные для входа')
            }
        },
        uploadFile: async (parent, { file }) => {
            const { createReadStream, filename} = await file;
      
            // Invoking the `createReadStream` will return a Readable Stream.
            // See https://nodejs.org/api/stream.html#stream_readable_streams
            const stream = createReadStream();

            const ext = path.parse(filename)

            const randomName = makeRandom(12) + ext
            
            const pathName = path.join(__dirname, `/public/tracks/${randomName}`)
            stream.pipe(fs.createWriteStream(pathName))

            await finished(pathName)

            const resultUrl = (error, result) =>{
                console.log(result, error)
                return result
            }
            console.log(resultUrl)

            cloudinary.uploader.upload(pathName, resultUrl)
            
            return resultUrl
        },        
        addTrack : async (parent, args, context) => {
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
        },
    }
}

module.exports  = resolvers
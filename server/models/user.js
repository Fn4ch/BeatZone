const {Schema, model} = require('mongoose')

const User = new Schema({
    email : {type: String, unique: true},
    username: {type: String },
    password: {type: String },
    likedTracks: {type: [String], default: []},
    role: {type: [String], ref:'Role'}
})
const user = model('User', User) 
module.exports = user
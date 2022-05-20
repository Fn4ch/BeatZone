const {Schema, model} = require('mongoose')

const User = new Schema({
    email : {type: String, unique: true},
    username: {type: String, unique: true},
    password: {type: String},
    playlists: {type: [String], ref: 'Playlist', default: []},
    image: {type: String},    
    role: {type: [String], ref:'Role'},
    token: {type: String}
})
const user = model('User', User) 
module.exports = user
const {Schema,model} = require('mongoose')

const User = new Schema({
    email : { type : String, unique: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    likedTracks: {type: [String], default: []},
    role: {type: [String], ref:'Role'}
})
const user = model('User', User) 
module.exports = user
const {Schema, model} = require('mongoose')

const Role = new Schema({
    title : {type : String},
    track : { type : [String], ref:'Track' }
})
const role = mongoose.model('Playlist', Playlist)
module.exports = role
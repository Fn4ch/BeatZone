const {Schema,model} = require('mongoose')

const Playlist = new Schema({
    title : {type : String},
    track : { type : [Object], ref:'Track', default: null },
    author : {type: String, ref:'User'}
})
const playlist = model('Playlist', Playlist)
module.exports = playlist
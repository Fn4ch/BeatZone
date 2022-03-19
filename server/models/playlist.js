const {Schema,model} = require('mongoose')

const Playlist = new Schema({
    title : {type : String},
    track : { type : [String], ref:'Track' },
    author : {type: [String], ref:'Role'}
})
const playlist = model('Playlist', Playlist)
module.exports = playlist
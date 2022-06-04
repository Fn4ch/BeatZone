const {Schema,model} = require('mongoose')

const Track = new Schema({
    name : { type: String},
    author : { type: String, ref: 'User'},
    description : { type: String},
    tags : { type: String},
    likes : { type: Number},
    audio : { type: String},   
    image: { type: String},
    comments : {type: [String], ref: 'Comments'}
})
const track = model('Track', Track) 
module.exports = track
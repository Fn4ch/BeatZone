const {Schema,model} = require('mongoose')

const Track = new Schema({
    title : { type: String},
    author : { type: String},
    description : { type: String},
    tags : { type: String},
    likes : { type: Number},
    audio : { type: String},   
    image: { type: String},
    comments : {type: String}
})
const track = model('Track', Track) 
module.exports = track
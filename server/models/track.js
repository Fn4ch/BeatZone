const {Schema,model} = require('mongoose')

const Track = new Schema({
    title : { type: String},
    author : { type: String, ref:'user'},
    description : { type: String},
    tags : { type: String},
    audio : { type: String},    
    image: { type: String},
    duration : {type: String},
    comment : {type: String}
})
const track = model('Track', Track) 
module.exports = track
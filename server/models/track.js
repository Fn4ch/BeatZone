const {Schema,model} = require('mongoose')

const Track = new Schema({
    title : { type: String, unique: false, required: true},
    author : { type: String, ref:"user", required: true},
    description : { type: String, required: true},
    tags : { type: String, required: true},
    audio : { type: String, required: true},    
    image: { type: String, required: true},
    duration : {type: String, required: true},
    comment : { type: String, required: false, unique:false}
})

const track = model('Track', Track) 
module.exports = track
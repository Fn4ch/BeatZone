const {Schema,model} = require('mongoose')

const Comments = new Schema({
    message : {type : String},
    author : {type: [String], ref:'User'}
})
const comments = model('Comments', comments)
module.exports = comments
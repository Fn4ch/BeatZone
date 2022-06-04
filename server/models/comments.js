const {Schema,model} = require('mongoose')

const Comments = new Schema({
    comment : {type : String},
    author : {type: String}
})
const comments = model('Comments', Comments)
module.exports = comments
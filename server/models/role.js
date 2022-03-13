const {Schema, model} = require('mongoose')

const Role = new Schema({
    value: {type: String, unique: true, default: "User"}
})
const role = mongoose.model('Role', Role)
module.exports = role
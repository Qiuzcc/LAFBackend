const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model.bind(mongoose)
const ObjectId = Schema.ObjectId

const userSchema = Schema({
    id: ObjectId,
    username: String,
    password: String,
    name: String,
    avatar: String,
    email: String
})

const User = Model('User', userSchema)

module.exports = { User }
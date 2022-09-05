const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model.bind(mongoose)
const ObjectId = Schema.ObjectId

/**
 * status 有4种状态：等待认领、已被认领、寻找中、已找到
 */
const foundSchema = Schema({
    id: ObjectId,
    title: String,
    campus: String,
    location: String,
    time: Date,
    type: String,
    description: String,
    photos: Array,
    status: String,
    user: { type: ObjectId, ref: 'User' }
})

const lostSchema = Schema({
    id: ObjectId,
    title: String,
    campus: String,
    location: String,
    time: Date,
    type: String,
    description: String,
    photos: Array,
    status: String,
    user: { type: ObjectId, ref: 'User' }
})

const Found = Model('Found', foundSchema)
const Lost = Model('Lost', lostSchema)

module.exports = { Found, Lost }
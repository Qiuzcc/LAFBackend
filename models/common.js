const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Model = mongoose.model.bind(mongoose)
const ObjectId = mongoose.Schema.ObjectId

const campusSchema = Schema({
    id: ObjectId,
    name: String
})

const typesSchema = Schema({
    id: ObjectId,
    type: String
})

const Campus = Model('Campus', campusSchema)
const Types = Model('Types', typesSchema)

module.exports = { Campus, Types }
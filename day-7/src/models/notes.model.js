const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
})


// note ke andr hum data store model ke through krte h
const noteModel = mongoose.model('notes', noteSchema)

module.exports = noteModel
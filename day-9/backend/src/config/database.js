const mongoose = require("mongoose")



function connectToDB() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is missing in .env")
    }

    return mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000
    })
        .then(() => {
            console.log("Connected to DB")
        })
}

module.exports = connectToDB

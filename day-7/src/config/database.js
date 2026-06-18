const mongoose = require('mongoose');


// connect to database
function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("database connected");
    })
}
 module.exports = connectToDb;
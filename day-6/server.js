const app = require("./src/app")
const mongoose = require('mongoose')

// Added () right here:
function connectToDb() {
    mongoose.connect('mongodb+srv://varunvisoriya_db_user:VarunPass123@cohert.ee3hq4h.mongodb.net/day-6')
    .then(()=>{
        console.log("database connected");
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("server running on port number 3000");
})
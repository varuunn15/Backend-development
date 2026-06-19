const express = require('express')
const authRouter = require("./routes/auth.routes")
const cookieParser = require('cookie-parser')


const app = express()

app.use(express.json())
// ye ek connector h authroutes file ka
app.use('/api/auth', authRouter)

//isme hmara user ya token store hota h cookie ek storage hoti h user side browser ki or te ek middleware h use connect krne k liye
app.use(cookieParser())

module.exports= app
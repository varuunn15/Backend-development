const express = require("express")
const noteModel = require('./models/notes.model')
const app = express();


app.use(express.json());


app.post('/notes', async(req,res) => {
    const { title, description } = req.body

   const note = await noteModel.create({
      title, description
    })
    res.status(201).json({
        message:'Notes created successfully',
        note
    })
})
 

app.get('/notes', async (req,res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message:"note fetch successfully",
        note
    })

})

<<<<<<< HEAD
module.exports = app;
=======
module.exports = app;
>>>>>>> 6fb6e85fff22789a3b72d01c70692df890767939

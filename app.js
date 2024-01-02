const express =  require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notes = require("./models/notesModel");
const app =  express();

const port = 4000;
const clientUrl = "http://localhost:3000"

app.use(cors({
    origin : clientUrl,
}))

app.use(express.json()); 

/////////////////////////////////// middelware
app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
})

///////////////////////////////// Get all notes 
app.get('/api/note/',async(req,res)=>{

    const getedNotes = await notes.find({}).sort({createdAt : -1});

    res.status(200).json(getedNotes);


})



///////////////////////////////// Get singel note
app.get("/api/note/:id",async(req,res)=>{

    const {id} =  req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : `${id} not a valide id`})
    }

    const getedOneNote = await notes.findById(id);
    if(!getedOneNote){
        return res.status(404).json({error: `No note found with id :${id} `})
    }

    res.status(200).json(getedOneNote);


})




////////////////////////////////// Post notes
app.post("/api/note/",async(req,res)=>{
    const {title , note} = req.body;

    try {
        const savenote = await notes.create({title,note});
        res.status(200).json({error: "Note Saved Successfully !!", color : "green"});

    } catch (error) {
        res.status(400).json({error: "error, Try again", color : "red"});
    }

})


///////////////////////////////// Deleting notes
app.delete("/api/note/delete/:id",async(req,res)=>{

    const {id} =  req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : `${id} not a valide id`})
    }

    const delnote = await notes.findOneAndDelete({_id: id});

    if(!delnote){
        return res.status(404).json({error: `No note found with id :${id} `})
    }

    res.status(200).json({error: "Note Deleted Successfully !!", color : "DarkPink"});

})

/////////////////////////////// Updating notes
app.patch("/api/note/update/:id",async(req,res)=>{

    const {id} =  req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : `${id} not a valide id`})
    }

    const updatedNote = await notes.findOneAndUpdate({_id: id},{
        ...req.body
    });

    if(!updatedNote){
        return res.status(404).json({error: `No note found with id :${id} `})
    }

    res.status(200).json({error: "Note Updated Successfully !!", color : "green"});

})

// conecting to the database and if the connection is failed then don't run the server and  log the error
mongoose.connect('mongodb://localhost:27017')
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Server running on port : ${port} || http://localhost:${port}/`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })


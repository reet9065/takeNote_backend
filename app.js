// Load environment variables from .env file
require('dotenv').config();


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const notes = require("./models/notesModel");
const app = express();

// Accessing Port no. from .env and storing it into a variable
const port = process.env.BACKEND_PORT;

// Accessing client url 
// In case we deploy this application  
// and then If we want to allow requests only from specific origins, 
// we can pass an  object to the cors and use it in express app

const clientUrl = process.env.CLIENT_URL;
app.use(cors({
    origin: clientUrl,
}))

// Middleware for parsing JSON in request body
app.use(express.json());

// Middleware to log every request path and method from the user
app.use((req, res, next) => {
    // Log request path and method
    console.log(req.path, req.method);
    next();
})

// Route to get all notes 
app.get('/api/note/', async (req, res) => {

    try {
        // Retrieve array of notes from MongoDB server, sorted by createdAt date
        const getedNotes = await notes.find({}).sort({ createdAt: -1 });
        // Send response with the retrieved notes
        res.status(200).json(getedNotes);
    } catch (error) {
        // Handle any errors during the retrieval process
        res.status(500).json({ massage: "Internal Server Error", color: "red" });
    }
})



// Route to get a single note by ID
app.get("/api/note/:id",async(req,res)=>{

    const {id} =  req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        // Return an error response if the provided ID is not valid
        return res.status(404).json({massage : `${id} not a valide id`})
    }

    try {
        // Retrieve a single note by ID from the MongoDB server
        const getedOneNote = await notes.findById(id);
        if (!getedOneNote) {
            // Return an error response if no note is found with the provided ID
            return res.status(404).json({ massage: `No note found with ID: ${id}` });
        }

        // Send the retrieved note as a response
        res.status(200).json(getedOneNote);
    } catch (error) {
        // Handle any errors during the retrieval process
        res.status(500).json({ massage: "Internal Server Error", color: "red" });
    }


})




app.post("/api/note/", async (req, res) => {
    const { title, note } = req.body;

    try {
        // Create and save a new note to the MongoDB server
        const savedNote = await notes.create({ title, note });
        // Send a success response
        res.status(200).json({ message: "Note Saved Successfully!!", color: "green" });

    } catch (error) {
        // Handle any errors during the note creation process
        res.status(400).json({ massage: "Error, Try again", color: "red" });
    }
})


// Route to delete a note by ID
app.delete("/api/note/delete/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        // Return an error response if the provided ID is not valid
        return res.status(400).json({ massage: `${id} not a valid ID` });
    }

    try {
        // Find and delete a note by ID from the MongoDB server
        const delNote = await notes.findOneAndDelete({ _id: id });
        if (!delNote) {
            // Return an error response if no note is found with the provided ID
            return res.status(404).json({ massage: `No note found with ID: ${id}` });
        }

        // Send a success response
        res.status(200).json({ message: "Note Deleted Successfully!!", color: "DarkPink" });

    } catch (error) {
        // Handle any errors during the note deletion process
        res.status(500).json({ massage: "Internal Server Error", color: "red" });
    }
})

// Route to update a note by ID
app.patch("/api/note/update/:id", async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        // Return an error response if the provided ID is not valid
        return res.status(400).json({ massage: `${id} not a valid ID` });
    }

    try {
        // Find and update a note by ID on the MongoDB server
        const updatedNote = await notes.findOneAndUpdate({ _id: id }, { ...req.body });
        if (!updatedNote) {
            // Return an error response if no note is found with the provided ID
            return res.status(404).json({ massage: `No note found with ID: ${id}` });
        }

        // Send a success response
        res.status(200).json({ message: "Note Updated Successfully!!", color: "green" });

    } catch (error) {
        // Handle any errors during the note update process
        res.status(500).json({ massage: "Internal Server Error", color: "red" });
    }
})

// Connecting to the database, log an error if connection fails
mongoose.connect(process.env.CONECTIONSTRING)
    .then(() => {
        // Start the server if the database connection is successful
        app.listen(port, () => {
            console.log(`Server running on port: ${port} || http://localhost:${port}/`);
        })
    })
    .catch((error) => {
        // Log an error if the database connection fails
        console.log(error);
    })


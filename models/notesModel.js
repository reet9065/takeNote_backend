// Import the mongoose library
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Defining a mongoose schema for the "notes" collection
const notesSchema = new Schema({
    // Define a field "title" of type String, which is required
    title: {
        type: String,
        required: true
    },
    // Define a field "note" of type String, which is required
    note: {
        type: String,
        required: true
    }
}, {
    // Enable automatic timestamps for createdAt and updatedAt fields
    timestamps: true
});

// Created a mongoose model for the "notes" collection using the defined schema
// The model is named 'notes'
module.exports = mongoose.model('notes', notesSchema);
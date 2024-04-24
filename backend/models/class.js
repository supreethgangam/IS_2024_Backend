// This file defines the Mongoose schema for the class model. The schema includes fields for the class name, students, chapters, tests, ID, and creation date. 
// The class model ensures data integrity by enforcing the required constraint on certain fields and uniqueness on the class name and ID.


const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Test' }],
    id: { type: Number, required: true, unique: true },
    created_at: { type: Date, required: true, default: Date.now }
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
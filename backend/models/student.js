// This file defines the Mongoose schema for the Student model. The schema includes three fields:
// id (a unique identifier for each student), score (a numerical value representing the student's score),
// and created_at (a timestamp for when the record was created). This model ensures data integrity
// by enforcing the required constraint on all fields and uniqueness on the id.

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    score: { type: Number, required: true },
    created_at: { type: Date, required: true, default: Date.now }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;


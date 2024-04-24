//This file defines the Mongoose schema for the Test model. The schema includes fields for the class ID, test name, test ID, and creation date.
//The test model ensures data integrity by enforcing the required constraint on all fields and uniqueness on the test ID.
//This model is used to store information about tests associated with a specific class.

const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    testName: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    created_at: { type: Date, required: true, default: Date.now },
    sentenceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sentence' }],
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
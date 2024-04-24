//This file defines the Mongoose schema for the Chapter model. The schema includes fields for the chapter title, associated class, sentences, ID, and creation date. 
//The chapter model ensures data integrity by enforcing the required constraint on certain fields and uniqueness on the chapter ID.

const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    sentences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sentence' }],
    id: { type: Number, required: true, unique: true },
    created_at: { type: Date, required: true, default: Date.now }
});

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
//This file defines the Mongoose schema for the Sentence model. The schema includes fields for the sentence content, associated chapter, audio recordings, ID, and creation date.
//The sentence model ensures data integrity by enforcing the required constraint on certain fields and uniqueness on the sentence ID.

const mongoose = require('mongoose');

const sentenceSchema = new mongoose.Schema({
    content: { type: String, required: true },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    audioRecordings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AudioRecording' }],
    id: { type: Number, required: true, unique: true },
    created_at: { type: Date, required: true, default: Date.now }
});

const Sentence = mongoose.model('Sentence', sentenceSchema);

module.exports = Sentence;
//This file contains the schema for the audio recording model. It contains the sentenceId, audioUrl, id, and created_at fields. 
//The sentenceId field is a reference to the Sentence model. The audioUrl field is a string that contains the URL of the audio recording. 
//The id field is a number that uniquely identifies the audio recording.
// The created_at field is a date that contains the date and time when the audio recording was created.
//The AudioRecording model is created using the mongoose.model method and exported from the file.

const mongoose = require('mongoose');

const audioRecordingSchema = new mongoose.Schema({
    sentenceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sentence', required: true },
    audioUrl: { type: String, required: true },
    id: { type: Number, required: true, unique: true },
    created_at: { type: Date, required: true, default: Date.now }
});

const AudioRecording = mongoose.model('AudioRecording', audioRecordingSchema);

module.exports = AudioRecording;
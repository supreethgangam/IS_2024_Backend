// audioRecordingController.js
const AudioRecording = require('../models/audioRecording');

exports.createAudioRecording = async (req, res) => {
    try {
        const newAudioRecording = new AudioRecording(req.body);
        await newAudioRecording.save();
        res.status(201).send('Audio recording created successfully');
    } catch (error) {
        res.status(500).send('Error creating audio recording: ' + error.message);
    }
};

exports.getAllAudioRecordings = async (req, res) => {
    try {
        const audioRecordings = await AudioRecording.find();
        res.send(audioRecordings);
    } catch (error) {
        res.status(500).send('Error retrieving audio recordings: ' + error.message);
    }
};

exports.getAudioRecordingById = async (req, res) => {
    try {
        const audioRecordingId = req.params.id;
        const foundAudioRecording = await
        AudioRecording.findById(audioRecordingId);
        if (!foundAudioRecording) {
            return res.status(404).send('Audio recording not found');
        }
        res.send(foundAudioRecording);
    }
    catch (error) {
        res.status(500).send('Error retrieving audio recording: ' + error.message);
    }
}

exports.updateAudioRecording = async (req, res) => {
    try {
        const audioRecordingId = req.params.id;
        const updatedAudioRecording = await
        Audio
        Recording.findByIdAndUpdate(audioRecordingId, req.body, { new: true });
        res.send(updatedAudioRecording);
    }
    catch (error) {
        res.status(500).send('Error updating audio recording: ' + error.message);
    }
}

exports.deleteAudioRecording = async (req, res) => {
    try {
        const audioRecordingId = req.params.id;
        await AudioRecording.findByIdAnd
        Delete(audioRecordingId);
        res.send('Audio recording deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting audio recording: ' + error.message);
    }
}

exports.addAudioRecordingToSentence = async (req, res) => {
    try {
        const sentenceId = req.params.sentenceId;
        const audioRecordingId = req.params.audioRecordingId;
        const sentence = await Sentence.findById(sentenceId);
        if (!sentence) {
            return res.status(404).send('Sentence not found');
        }
        const audioRecording = await AudioRecording.findById(audioRecordingId);
        if (!audioRecording) {
            return res.status(404).send('Audio recording not found');
        }
        sentence.audioRecordings.push(audioRecordingId);
        await sentence.save();
        res.send('Audio recording added to sentence successfully');
    } catch (error) {
        res.status(500).send('Error adding audio recording to sentence: ' + error.message);
    }
};

exports.deleteAudioRecordingFromSentence = async (req, res) => {
    try {
        const sentenceId = req.params.sentenceId;
        const audioRecordingId = req.params.audioRecordingId;
        const sentence = await
        Sentence.findById(sentenceId);
        if (!sentence) {
            return res.status(404).send('Sentence not found');
        }
        const audioRecordingIndex = sentence.audioRecordings.indexOf(audioRecordingId);
        if (audioRecordingIndex === -1) {
            return res.status(404).send('Audio recording not found in sentence');
        }
        sentence.audioRecordings.splice(audioRecordingIndex, 1);
        await sentence.save();
        res.send('Audio recording deleted from sentence successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting audio recording from sentence: ' + error.message);
    }
}


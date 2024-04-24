const express = require('express');
const router = express.Router();
const audioRecordingController = require('../controllers/audioRecordingController');

router.post('/', audioRecordingController.createAudioRecording);
router.get('/', audioRecordingController.getAllAudioRecordings);
router.get('/:id', audioRecordingController.getAudioRecordingById);
router.put('/:id', audioRecordingController.updateAudioRecording);
router.delete('/:id', audioRecordingController.deleteAudioRecording);
router.put('/:sentenceId/addAudioRecording/:audioRecordingId', audioRecordingController.addAudioRecordingToSentence);
router.put('/:sentenceId/removeAudioRecording/:audioRecordingId', audioRecordingController.deleteAudioRecordingFromSentence);

module.exports = router;

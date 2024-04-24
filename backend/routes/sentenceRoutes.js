const express = require('express');
const router = express.Router();
const sentenceController = require('../controllers/sentenceController');

router.post('/', sentenceController.createSentence);
router.get('/', sentenceController.getAllSentences);
router.get('/:id', sentenceController.getSentenceById);
router.put('/:id', sentenceController.updateSentence);
router.delete('/:id', sentenceController.deleteSentence);
router.put('/:chapterId/addSentence/:sentenceId', sentenceController.addSentenceToChapter);
router.put('/:chapterId/removeSentence/:sentenceId', sentenceController.removeSentenceFromChapter);

module.exports = router;

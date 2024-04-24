// testRoutes.js
const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.post('/', testController.createTest);
router.get('/', testController.getAllTests);
router.get('/:id', testController.getTestById);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);
router.put('/:testId/addSentences', testController.addSentencesToTest);
router.put('/:testId/removeSentence/:sentenceId', testController.removeSentenceFromTest);
router.get('/:testId/sentences', testController.getAllSentencesInTest);

module.exports = router;

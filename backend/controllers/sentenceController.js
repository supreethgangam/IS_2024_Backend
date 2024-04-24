// sentenceController.js
const Sentence = require('../models/sentence');

exports.createSentence = async (req, res) => {
    try {
        const newSentence = new Sentence(req.body);
        await newSentence.save();
        res.status(201).send('Sentence created successfully');
    } catch (error) {
        res.status(500).send('Error creating sentence: ' + error.message);
    }
};

// Implement getAllSentences, getSentenceById, updateSentence, deleteSentence controllers similarly
exports.getAllSentences = async (req, res) => {
    try {
        const sentences = await Sentence.find();
        res.send(sentences);
    } catch (error) {
        res.status(500).send('Error retrieving sentences: ' + error.message);
    }
};

exports.getSentenceById = async (req, res) => {
    try {
        const sentenceId = req.params.id;
        const foundSentence = await
        Sentence.findById(sentenceId);
        if (!foundSentence) {
            return res.status(404).send('Sentence not found');
        }
        res.send(foundSentence);
    }
    catch (error) {
        res.status(500).send('Error retrieving sentence: ' + error.message);
    }
}

exports.updateSentence = async (req, res) => {
    try {
        const sentenceId = req.params.id;
        const updatedSentence = await
        Sentence.findByIdAndUpdate(sentenceId, req.body, { new: true });
        res.send(updatedSentence);
    }
    catch (error) {
        res.status(500).send('Error updating sentence: ' + error.message);
    }
}

exports.deleteSentence = async (req, res) => {
    try {
        const sentenceId = req.params.id;
        await Sentence.findByIdAnd
        Delete(sentenceId);
        res.send('Sentence deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting sentence: ' + error.message);
    }
}

exports.addSentenceToChapter = async (req, res) => {
    try {
        const chapterId = req.params.chapterId;
        const sentenceId = req.params.sentenceId;
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).send('Chapter not found');
        }
        const sentence = await Sentence.findById(sentenceId);
        if (!sentence) {
            return res.status(404).send('Sentence not found');
        }
        chapter.sentences.push(sentenceId);
        await chapter.save();
        res.send('Sentence added to chapter successfully');
    } catch (error) {
        res.status(500).send('Error adding sentence to chapter: ' + error.message);
    }
};

exports.removeSentenceFromChapter = async (req, res) => {
    try {
        const chapterId = req.params.chapterId;
        const sentenceId = req.params.sentenceId;
        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).send('Chapter not found');
        }
        const sentenceIndex = chapter.sentences.indexOf(sentenceId);
        if (sentenceIndex === -1) {
            return res.status(404).send('Sentence not found in chapter');
        }
        chapter.sentences.splice(sentenceIndex, 1);
        await chapter.save();
        res.send('Sentence removed from chapter successfully');
    } catch (error) {
        res.status(500).send('Error removing sentence from chapter: ' + error.message);
    }
};


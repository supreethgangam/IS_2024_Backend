// chapterController.js
const Chapter = require('../models/chapter');

exports.createChapter = async (req, res) => {
    try {
        const newChapter = new Chapter(req.body);
        await newChapter.save();
        res.status(201).send('Chapter created successfully');
    } catch (error) {
        res.status(500).send('Error creating chapter: ' + error.message);
    }
};


exports.getAllChapters = async (req, res) => {
    try {
        const chapters = await Chapter.find();
        res.send(chapters);
    } catch (error) {
        res.status(500).send('Error retrieving chapters: ' + error.message);
    }
}

exports.getChapterById = async (req, res) => {
    try {
        const chapterId = req.params.id;
        const foundChapter = await
        Chapter.findById(chapterId);
        if (!foundChapter) {
            return res.status(404).send('Chapter not found');
        }
        res.send(foundChapter);
    }
    catch (error) {
        res.status(500).send('Error retrieving chapter: ' + error.message);
    }
}

exports.updateChapter = async (req, res) => {
    try {
        const chapterId = req.params.id;
        const updatedChapter = await Chapter.findByIdAndUpdate
        (chapterId, req.body, { new: true });
        res.send(updatedChapter);
    }
    catch (error) {
        res.status(500).send('Error updating chapter: ' + error.message);
    }
}

exports.deleteChapter = async (req, res) => {
    try {
        const chapterId = req.params.id;
        await Chapter.findByIdAndDelete(chapterId);
        res.send('Chapter deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting chapter: ' + error.message);
    }
}

exports.addChapterToClass = async (req, res) => {
    try {
        const classId = req.params.classId;
        const chapterId = req.params.chapterId;
        const foundClass = await Class.findById(classId);
        if (!foundClass) {
            return res.status(404).send('Class not found');
        }
        foundClass.chapters.push(chapterId);
        await foundClass.save();
        res.send('Chapter added to class successfully');
    } catch (error) {
        res.status(500).send('Error adding chapter to class: ' + error.message);
    }
};

exports.getSentencesInChapter = async (req, res) => {
    try {
        const chapterId = req.params.chapterId;
        const foundChapter = await
        Chapter.findById(chapterId);
        if (!foundChapter) {
            return res.status(404).send('Chapter not found');
        }
        const sentences = await Sentence.find({ _id: { $in: foundChapter.sentences } });
        res.send(sentences);
    }
    catch (error) {
        res.status(500).send('Error retrieving sentences: ' + error.message);
    }
}

// testController.js
const Test = require('../models/test');

exports.createTest = async (req, res) => {
    try {
        const newTest = new Test(req.body);
        await newTest.save();
        res.status(201).send('Test created successfully');
    } catch (error) {
        res.status(500).send('Error creating test: ' + error.message);
    }
};

// Implement getAllTests, getTestById, updateTest, deleteTest controllers similarly
exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find();
        res.send(tests);
    } catch (error) {
        res.status(500).send('Error retrieving tests: ' + error.message);
    }
};

exports.getTestById = async (req, res) => {
    try {
        const testId = req.params.id;
        const foundTest = await
        Test.findById(testId);
        if (!foundTest) {
            return res.status(404).send('Test not found');
        }
        res.send(foundTest);
    }
    catch (error) {
        res.status(500).send('Error retrieving test: ' + error.message);
    }
}

exports.updateTest = async (req, res) => {
    try {
        const testId = req.params.id;
        const updatedTest = await
        Test.findByIdAndUpdate(testId, req.body, { new: true });
        res.send(updatedTest);
    }
    catch (error) {
        res.status(500).send('Error updating test: ' + error.message);
    }   
}

exports.deleteTest = async (req, res) => {
    try {
        const testId = req.params.id;
        await Test.findByIdAnd
        Delete(testId);
        res.send('Test deleted successfully');
    }
    catch (error) {
        res.status(500).send('Error deleting test: ' + error.message);
    }
}

//add sentences to a test through their ids
exports.addSentencesToTest = async (req, res) => {
    try {
        const testId = req.params.testId;
        const sentenceIds = req.body.sentenceIds;
        const foundTest = await Test.findById(testId);
        if (!foundTest) {
            return res.status(404).send('Test not found');
        }
        foundTest.sentences.push(...sentenceIds);
        await foundTest.save();
        res.send(foundTest);
    } catch (error) {
        res.status(500).send('Error adding sentences to test: ' + error.message);
    }
};

//remove a sentence from a test
exports.removeSentenceFromTest = async (req, res) => {
    try {
        const testId = req.params.testId;
        const sentenceId = req.params.sentenceId;
        const foundTest = await Test.findById(testId);
        if (!foundTest) {
            return res.status(404).send('Test not found');
        }
        foundTest.sentences = foundTest.sentences.filter(sentence => sentence.toString() !== sentenceId);
        await foundTest.save();
        res.send('Sentence removed from test successfully');
    } catch (error) {
        res.status(500).send('Error removing sentence from test: ' + error.message);
    }
};

//get all sentences in a test
exports.getAllSentencesInTest = async (req, res) => {
    try {
        const testId = req.params.testId;
        const foundTest = await Test.findById(testId);
        if (!foundTest) {
            return res.status(404).send('Test not found');
        }
        res.send(foundTest.sentences);
    } catch (error) {
        res.status(500).send('Error retrieving sentences: ' + error.message);
    }
};
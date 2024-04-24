const Class = require('../models/class');

exports.createClass = async (req, res) => {
    try {
        const newClass = new Class(req.body);
        await newClass.save();
        res.status(201).send('Class created successfully');
    } catch (error) {
        res.status(500).send('Error creating class: ' + error.message);
    }
};

exports.getAllClasses = async (req, res) => {
    try {
        const classes = await Class.find();
        res.send(classes);
    } catch (error) {
        res.status(500).send('Error retrieving classes: ' + error.message);
    }
};

exports.getClassById = async (req, res) => {
    try {
        const classId = req.params.id;
        const foundClass = await Class.findById(classId);
        if (!foundClass) {
            return res.status(404).send('Class not found');
        }
        res.send(foundClass);
    } catch (error) {
        res.status(500).send('Error retrieving class: ' + error.message);
    }
};

exports.updateClass = async (req, res) => {
    try {
        const classId = req.params.id;
        const updatedClass = await Class.findByIdAndUpdate(classId, req.body, { new: true });
        res.send(updatedClass);
    } catch (error) {
        res.status(500).send('Error updating class: ' + error.message);
    }
};

exports.deleteClass = async (req, res) => {
    try {
        const classId = req.params.id;
        await Class.findByIdAndDelete(classId);
        res.send('Class deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting class: ' + error.message);
    }
};

//get all chapters of a class
exports.getAllChaptersOfClass = async (req, res) => {
    try {
        const classId = req.params.classId;
        const foundClass = await Class.findById(classId);
        if (!foundClass) {
            return res.status(404).send('Class not found');
        }
        res.send(foundClass.chapters);
    } catch (error) {
        res.status(500).send('Error retrieving chapters: ' + error.message);
    }
};  

//get all students in a class
exports.getAllStudentsInClass = async (req, res) => {
    try {
        const classId = req.params.classId;
        const foundClass = await Class.findById(classId);
        if (!foundClass) {
            return res.status(404).send('Class not found');
        }
        res.send(foundClass.students);
    } catch (error) {
        res.status(500).send('Error retrieving students: ' + error.message);
    }
};
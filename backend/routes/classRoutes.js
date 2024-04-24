const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/getclass/:id', classController.getClassById); // Retrieve a class by ID
router.post('/addclass/', classController.createClass); // Add a new class
router.put('/updateclass/:id', classController.updateClass); // Update a class
router.delete('/deleteclass/:id', classController.deleteClass); // Delete a class
router.get('/getallclasses/', classController.getAllClasses); // Retrieve all classes
router.get('/getallchapters/:classId', classController.getAllChaptersOfClass); // Retrieve all chapters of a class
router.get('/getallstudents/:classId', classController.getAllStudentsOfClass); // Retrieve all students of a class

module.exports = router;

// This module sets up the routes for student operations using Express. It handles various HTTP 
// methods to support CRUD operations and retrieval of statistical data for students. Each route 
// is connected to a specific controller function in the 'studentController', which performs the 
// corresponding database operations.

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/getstudentscore/:id', studentController.getStudentById); // Retrieve a student by ID
router.post('/addstudent/', studentController.addStudent); // Add a new student
router.put('/updatestudentscore/:id', studentController.updateStudentScore); // Update a student's score
router.delete('/deletestudent/:id', studentController.deleteStudent); // Delete a student
router.get('/stats/:year', studentController.getYearlyStatistics); // Statistical data by year

module.exports = router;



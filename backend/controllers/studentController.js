// Import the Student model from the models directory
const Student = require('../models/student');

// Function to calculate the mean (average) of an array of numbers
function calculateMean(scores) {
    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / scores.length;
    return parseFloat(mean.toFixed(3)); // Formats the mean to three decimal places
}

// Function to calculate the median of an array of numbers
function calculateMedian(scores) {
    scores.sort((a, b) => a - b);
    const mid = Math.floor(scores.length / 2);
    const median = scores.length % 2 !== 0 ? scores[mid] : (scores[mid - 1] + scores[mid]) / 2;
    return parseFloat((median / 2).toFixed(3)); // Formats the median to three decimal places
}

// Function to calculate the mode (most frequent value) of an array of numbers
function calculateMode(scores) {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];
    scores.forEach(score => {
        if (!frequency[score]) {
            frequency[score] = 0;
        }
        frequency[score]++;
        if (frequency[score] > maxFreq) {
            maxFreq = frequency[score];
            modes = [score];
        } else if (frequency[score] === maxFreq) {
            modes.push(score);
        }
    });
    return [...new Set(modes)]; // Return unique modes
}

// API function to retrieve a student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findOne({ id: req.params.id });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.send(student);
    } catch (error) {
        res.status(500).send('Error retrieving student: ' + error.message);
    }
};

// API function to add a new student
exports.addStudent = async (req, res) => {
    try {
        const newStudent = new Student({
            id: req.body.id,
            score: req.body.score
        });
        await newStudent.save();
        res.status(201).send('Student added successfully');
    } catch (error) {
        res.status(500).send('Error adding student: ' + error.message);
    }
};

// API function to update a student's score
exports.updateStudentScore = async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { id: req.params.id },
            { $set: { score: req.body.score } },
            { new: true }
        );
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.send(student);
    } catch (error) {
        res.status(500).send('Error updating student: ' + error.message);
    }
};

// API function to delete a student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ id: req.params.id });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        res.send('Student deleted successfully');
    } catch (error) {
        res.status(500).send('Error deleting student: ' + error.message);
    }
};

// API function to retrieve statistics (mean, median, mode) for all students' scores by year and month
exports.getYearlyStatistics = async (req, res) => {
    const year = parseInt(req.params.year);
    try {
        const students = await Student.find({
            "created_at": {
                $gte: new Date(`${year}-01-01`),
                $lt: new Date(`${year+1}-01-01`)
            }
        });

        const monthlyData = students.reduce((acc, student) => {
            const month = student.created_at.getMonth() + 1; // JavaScript months are 0-indexed
            if (!acc[month]) acc[month] = [];
            acc[month].push(student.score);
            return acc;
        }, {});

        const results = Object.keys(monthlyData).map(month => {
            const scores = monthlyData[month];
            return {
                month,
                year,
                mean: calculateMean(scores),
                median: calculateMedian(scores),
                mode: calculateMode(scores)
            };
        });

        res.json(results);
    } catch (error) {
        res.status(500).send("Error retrieving data from MongoDB: " + error.message);
    }
};

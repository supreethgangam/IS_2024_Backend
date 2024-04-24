// This server.js server setup uses Express for routing and Mongoose for MongoDB interaction. 
// It includes environment variable support with dotenv for configuration. The server defines 
// routes for student-related operations and connects to MongoDB using credentials from a .env file. 
// It listens on a designated port and logs connection status to the console.

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const studentRoutes = require('./routes/studentRoutes');
const classRoutes = require('./routes/classRoutes');
const chapterRoutes = require('./routes/chapterRoutes');
const sentenceRoutes = require('./routes/sentenceRoutes');
const testRoutes = require('./routes/testRoutes');
const audioRecordingRoutes = require('./routes/audioRecordingRoutes');


const app = express();
app.use(express.json()); // for parsing application/json

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/students', studentRoutes);
app.use('/classes', classRoutes);
app.use('/chapters', chapterRoutes);
app.use('/sentences', sentenceRoutes);
app.use('/tests', testRoutes);
app.use('/audio-recordings', audioRecordingRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

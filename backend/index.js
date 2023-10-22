const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();
// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

const roomRoute = require('./Routes/AddRoom');
app.use('/api/rooms', roomRoute);
app.use('/api/faculty', facutlyRoute);
app.use('/api/course', courseRoute);

// Start the server`
const port = 3000;``

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

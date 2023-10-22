const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseCode: {
        type: Number,
        required: true,
    },
    creditHours: {
        type: Number,
        required: true,
    },
    prerequisites:
        [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
        ],
    teachers: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
    ],
});

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;

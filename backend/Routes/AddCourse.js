const express = require('express');
const router = express.Router();
const course = require('../Models/lostitems');

router.post('/add', async (req, res) => {
    try {
        const { courseName, courseCode, creditHours, prerequisites, teachers } = req.body;

        const existingCourse = await course.findOne({ courseCode });

        if (existingCourse) {
            return res.status(409).json({ error: 'Course already exists' });
        }

        const newCourse = new course({ courseName, courseCode, creditHours, prerequisites, teachers });

        await newCourse.save();

        res.status(200).json({ message: 'Course added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// fetching faculty
router.get('/', async (req, res) => {
    try {
        const CoursesData = await course.find();
        res.json(CoursesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

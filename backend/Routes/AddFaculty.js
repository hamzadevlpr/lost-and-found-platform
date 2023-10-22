const express = require('express');
const router = express.Router();
const faculty = require('../Models/Faculty');

router.post('/add', async (req, res) => {
    try {
        const { facultyName, facultyEmail, facultyStatus, coursesTaught } = req.body;

        const existingFaculty = await faculty.findOne({ facultyEmail });

        if (existingFaculty) {
            return res.status(401).json({ error: 'Faculty already exists' });
        }

        const newFaculty = new faculty({ facultyName, facultyEmail, facultyStatus, coursesTaught });

        await newFaculty.save();

        res.status(200).json({ message: 'Faculty added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// fetching faculty
router.get('/', async (req, res) => {
    try {
        const facultiesData = await faculty.find();
        res.json(facultiesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

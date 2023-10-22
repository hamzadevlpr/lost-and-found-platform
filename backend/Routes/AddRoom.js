const express = require('express');
const router = express.Router();
const Room = require('../Models/Room');

router.post('/add', async (req, res) => {
    try {
        const { roomName, floor, capacity } = req.body;

        const existingRoom = await Room.findOne({ roomName });

        if (existingRoom) {
            return res.status(400).json({ error: 'Room Name already exists' });
        }

        const newRoom = new Room({ roomName, floor, capacity });

        await newRoom.save();

        res.status(200).json({ message: 'Room added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// fetching rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;

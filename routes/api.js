// http://localhost:5000/api/

const express = require('express');
const router = express.Router();
const Message = require('../models/message'); 

// GET http://localhost:5000/api/getMessage 
router.route('/getMessage').get((req, res) => {
    Message.find()
        .then(messages => res.json(messages))
        .catch(err => res.status(400).json('Error: ' + err)); 
}); 

// POST http://localhost:5000/api/postMessage
router.route('/postMessage').post((req, res) => {
    const title = req.body.title;
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const timeZone = req.body.timeZone; 
    const zoomLink = req.body.zoomLink;
    const zoomPassword = req.body.zoomPassword;
    const description = req.body.description; 
    const category = req.body.category; 
    const newMessage = new Message({
        title,
        date,
        startTime,
        endTime,
        timeZone,
        zoomLink,
        zoomPassword,
        description,
        category 
    })
    newMessage.save()
        .then(() => res.json('Message posted!'))
        .catch(err => res.status(400).json('Error: ' + err)); 
})

module.exports = router; 

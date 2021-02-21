const mongoose = require('mongoose'); 

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    title: { type: String, required: true},  
    date: { type: Date, required: true}, 
    zoomLink: { type: String, required: true},  
    description:  { type: String, required: true},  
    category: { type: Array, required: true}, 
}, {
    timestamps: true
}); 

const Message = mongoose.model('message', MessageSchema); 

module.exports = Message; 

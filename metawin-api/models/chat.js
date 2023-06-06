const mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
    sender: String,
    room: Number,
    content: String,
    chatId: String,
    timestamp: Number,
}, {
    timestamps: true
});

let Chats = mongoose.model('Chats', chatSchema);
module.exports = { Chats, chatSchema };
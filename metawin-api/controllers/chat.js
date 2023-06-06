const moment = require('moment');
const Users = require("../models/user").Users;
const Chats = require("../models/user").Chats;

module.exports = (io, socket) => {
    const joinRoom = function (payload) {
        const socket = this;
        socket.join(payload);
      };
    
      const sendMessage = function (payload) {
          const socket = this;
          socket.to(data.room).emit("receiveMessage", data);
      };
  
      const getChats = function (payload) {
          const socket = this;
      };
  
      const typing = function (payload) {
          const socket = this;    
          socket.broadcast.emit('typingResponse', data)
      };
  
      const disconnect = function (payload) {
          const socket = this;
          socket.to(roomId).emit("userDisconnected", socket.userId);
      };
}
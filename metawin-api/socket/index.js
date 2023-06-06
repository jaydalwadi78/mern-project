const Users = require("../models/user").Users;
const Chats = require("../models/chat").Chats;
const { joinRoom, leaveRoom } = require("./usersocket");

const configureSockets = (io, socket) => {
  return {
	joinRoom: joinRoom(io, socket),
	leaveRoom: leaveRoom(io, socket),
  };
};

const onConnection = (io) => async (socket) => {
	
	let messages = await Chats.find({}).sort({ createdAt: -1 }).limit(20);
	socket.emit("allmsg", messages);

	const { joinRoom, leaveRoom } = configureSockets(io, socket);

	socket.on("joinRoom", joinRoom);
	socket.on("leaveRoom", leaveRoom);
};

module.exports = { onConnection };
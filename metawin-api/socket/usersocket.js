const Chats = require("../models/chat").Chats;
const Users = require("../models/user").Users;
var ObjectId = require('mongoose').Types.ObjectId; 
const room = "globalChat";
const CHAT_BOT = "METAWIN";
let allUsers = [];

const joinRoom = (io, socket) => {
	return async function driverLocation(payload) {
		console.log(
			`join room event has been received with ${JSON.stringify(payload)} 🍅🍋`
		);
		let address = payload.address.toLowerCase();
		let userid =  new ObjectId(payload.userid);

		let result = {
			socketID: socket.id
		}

		let filter = {
			address: address,
			_id: userid
		}

		await Users.updateOne( filter , { $set: result }, { upsert: true });
		allUsers.push({ id: socket.id, userid: payload.userid, CHAT_BOT, room });
		let chatRoomUsers = allUsers.filter((user) => user.room === room);
		socket.join(room);

		console.log("chatRoomUsers >>>>> ", chatRoomUsers);
		socket.emit('chatroom_users', chatRoomUsers);
		let __createdtime__ = Date.now();
		socket.emit('receive_message', {
			message: `Welcome ${address}`,
			username: CHAT_BOT,
			__createdtime__,
		  });
		// socket.emit("connectedUser", socket.id)
	};
};

const leaveRoom  = (io, socket) => {
	return async function driverLocation(payload) {
		console.log(
			`leave room event has been received with ${JSON.stringify(payload)} 🍅🍋`
		);
		let userid =  payload.userid;
		/* let existUser = allUsers.filter((user) => user.userid === userid);
		allUsers.splice(existUser,1); */

		let existUser = allUsers.filter((user) => user.userid != userid);
		console.log("chatRoomUsers >>>>>>>>>>>>>>>>>", existUser);
		socket.leave(room);
		socket.emit('chatroom_users', existUser);
	}
}

module.exports = { joinRoom, leaveRoom };
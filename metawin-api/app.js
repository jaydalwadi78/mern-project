const cookieSession = require("cookie-session");
const mongoose = require('mongoose');
const axios = require('axios');
const CONFIG = require('./config/config');
const { to, ReE, ReS } = require('./services/util.service');
const express = require('express');
const v1 = require('./routes/v1');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require("passport");
const cookieParser = require("cookie-parser"); // parse cookie header
const http = require('http');
const keys = require("./config/key");
const path = require('path');
const { Server } = require("socket.io");
const moment = require('moment');
const { onConnection } = require("./socket");

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connect = mongoose.connect(CONFIG.LOCAL_MONGO_URL, options);
connect.then((db) => {
    console.log('Connected correctly to mongo database server!');
}, (err) => {
    console.log(err);
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, { transports: ["websocket"] });
const fullpath = path.resolve(__dirname);

app.use('/uploads', express.static('assets/raffleimage'));
io.on("connection", onConnection(io));

app.use(
    cookieSession({
        name: "session",
        keys: [keys.COOKIE_KEY],
        maxAge: 86400000,
    })
);
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:3001", "http://178.33.152.131:3000", "http://localhost:3002", "http://192.168.1.34:3000", "http://192.168.1.11:5012", "http://192.168.1.11:3000", "http://192.168.1.13:3000", "http://192.168.1.4:3000", "http://192.168.1.9:3000", "http://192.168.1.14:3000", "http://192.168.1.17:3000", "http://192.168.1.15:3000", "http://192.168.1.12:3000", "http://192.168.1.10:3000"], // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // allow session cookie from browser to pass through
    })
);

// set up routes
app.use("/auth", v1);

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.status(401).json({
            authenticated: false,
            message: "user has not been authenticated",
        });
    } else {
        next();
    }
};
app.get("/", authCheck, (req, res) => {
    res.status(200).json({
        authenticated: true,
        message: "user successfully authenticated",
        user: req.user,
        cookies: req.cookies,
    });
});

// app.set('socketio', io);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use('/v1', v1);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X- Request-With');
    next();
});


module.exports = { app: app, server: server, fullpath };
const mongoose = require('mongoose');
const router = require("express").Router();
const passport = require("passport");
const { to, ReE, ReS } = require('../services/util.service');
const CLIENT_HOME_PAGE_URL = "https://raffle.upcomingnft.net";
const axios = require("axios");
const Users = require("../models/user").Users;
const { TwitterApi } = require('twitter-api-v2');
const KEYS = require("../config/key");
const CONFIG = require('../config/config');

/*var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connect = mongoose.connect(CONFIG.LOCAL_MONGO_URL, options);
connect.then((db) => {
    console.log('Connected correctly to mongo database server!');
}, (err) => {
    console.log(err);
});*/

const followings = async (id) => {
    const req = await axios.get(
        `https://api.twitter.com/2/users/${id}/following?max_results=1000`,
        {
            headers: {
                Accept: "application/json",
                Authorization:
                    "Bearer AAAAAAAAAAAAAAAAAAAAALRAfQEAAAAAqnPKXAyg3QPfjdeqN3eXGQSR6J0%3DMv7s7lljixUKh5JzY6KK0mclmFbmkoEoe1eWzHjwolVaF25z8c",
            },
        }
    );
    return req.data;
};

const login = async (req, res) => {
    if (req.user) {
        let user_id = req.query.userid;
        // let up_id = "1437371846148558855";
        let up_id = "1550821111688237057";
        let exUser = await Users.findOne({ twitter_id: req.user.twitterId });

        console.log("exUser >>> ", exUser)

        if (exUser) {
            return ReE(res, {
                message: "This twitter is already linked.",
                user: req.user,
                followings: 0,
                cookies: req.cookies,
            }, 201);
        } else {
            const client = new TwitterApi({
                appKey: KEYS.TWITTER_CONSUMER_KEY,
                appSecret: KEYS.TWITTER_CONSUMER_SECRET,
                accessToken: req.user.token,
                accessSecret: req.user.tokenSecret
            });


            let followingsOfuser = await client.v2.following(req.user.twitterId);

            followingsOfuser.data.filter((e) => String(e.id) === String(up_id)).length > 0 ?
                (followingsOfuser = 1) : (followingsOfuser = 0);

            let euser = await Users.updateOne({ _id: user_id }, { twitter_verified: followingsOfuser });

            following_by = followingsOfuser;

            if (following_by == 0) {
                const { relationship } = await client.v1.friendship({ source_id: req.query.userid, target_id: up_id });
                if (relationship.source.following == true) {
                    following_by = 1;
                }
            }

            if (user_id) {
                await Users.updateOne({ "_id": user_id }, { twitter_id: req.user.twitterId, twitter_screen_name: req.user.screenName, twitter_access_token: req.user.token, twitter_access_secret: req.user.tokenSecret, twitter_verified: following_by });
            }

            return ReS(res, {
                message: "Twitter linked successfully.",
                user: req.user,
                followings: following_by,
                cookies: req.cookies,
            }, 201);
        }
    }
}
module.exports.login = login;

const logout = async (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
}
module.exports.logout = logout;


const loginFailed = async (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate.",
    });
}
module.exports.loginFailed = loginFailed;


const mongoose = require("mongoose");
const Participants = require("../models/participant").Participants;
const Raffles = require("../models/raffle").Raffles;
const { to, ReE, ReS } = require("../services/util.service");
const axios = require("axios");
const Users = require("../models/user").Users;
const moment = require("moment");
const KEYS = require("../config/key");
const { TwitterApi } = require("twitter-api-v2");
const CONFIG = require("../config/config");

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

const retweetedBy = async () => {
    const req = await axios.get(
        `https://api.twitter.com/2/tweets/1630108013804634114/retweeted_by`,
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

const likedTweets = async (id) => {
    const req = await axios.get(
        `https://api.twitter.com/2/users/${id}/liked_tweets`,
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

const buyTicket = async (req, res) => {
    let userid = req.body.userid;
    let raffleId = req.body.raffleId;
    user = await Users.findOne({ _id: req.body.userid });
    raffle = await Raffles.findOne({ _id: req.body.raffleId });
    data = await Participants.findOne({
        raffleId: req.body.raffleId,
        UserId: req.body.userid,
    });
    var tweet_id = raffle.tweetId;
    var twitter_user_id = user.twitter_id;

    if (data && data.isDone == 1) {
    } else {
        if (user && user.twitter_access_token && user.twitter_access_secret) {
            const client = new TwitterApi({
                appKey: KEYS.TWITTER_CONSUMER_KEY,
                appSecret: KEYS.TWITTER_CONSUMER_SECRET,
                accessToken: user.twitter_access_token,
                accessSecret: user.twitter_access_secret,
            });
            // user table
            if (user.twitter_verified != 1) {
                // let up_id = "1437371846148558855";
                let up_id = "1550821111688237057";
                let followingsOfuser = await client.v2.following(
                    twitter_user_id
                );

                followingsOfuser.data.filter(
                    (e) => String(e.id) === String(up_id)
                ).length > 0
                    ? (followingsOfuser = 1)
                    : (followingsOfuser = 0);

                if (followingsOfuser == 0) {
                    const { relationship } = await client.v1.friendship({
                        source_id: twitter_user_id,
                        target_id: up_id,
                    });
                    if (relationship.source.following == true) {
                        followingsOfuser = 1;
                    }
                }

                let euser = await Users.updateOne(
                    { _id: req.body.userid },
                    { twitter_verified: followingsOfuser }
                );
            }

            let userLikedetails,
                retweetDetails = 0;
            if (data) {
                console.log("in if");
                if (data.twiter_like != 1) {
                    userLikedetails = await client.v2.userLikedTweets(
                        twitter_user_id
                    );
                    userLikedetails._realData.data.filter(
                        (e) => String(e.id) === String(tweet_id)
                    ).length > 0
                        ? (userLikedetails = 1)
                        : (userLikedetails = 0);
                } else {
                    userLikedetails = 1;
                }

                if (data.twiter_retweet != 1) {
                    retweetDetails = await client.v2.tweetRetweetedBy(tweet_id);
                    if (retweetDetails.meta.result_count != 0) {
                        console.log("called in here");
                        retweetDetails.data.filter(
                            (e) => String(e.id) === String(twitter_user_id)
                        ).length > 0
                            ? (retweetDetails = 1)
                            : (retweetDetails = 0);
                    } else {
                        retweetDetails = 0;
                    }
                } else {
                    retweetDetails = 1;
                }
                let raffleParticipants = await Participants.updateOne(
                    { UserId: req.body.userid, raffleId: req.body.raffleId },
                    {
                        twiter_like: userLikedetails,
                        twiter_retweet: retweetDetails,
                    }
                );

                let entry = await Participants.findOne({
                    raffleId: req.body.raffleId,
                    UserId: req.body.userid,
                });

                if (
                    entry.twiter_like == 1 &&
                    entry.twiter_retweet == 1 &&
                    user.email_verified == 1 &&
                    user.twitter_verified == 1
                ) {
                    let etr = await Participants.updateOne(
                        { _id: entry._id },
                        { isDone: 1 }
                    );

                    let entered = raffle.entered;
                    await Raffles.updateOne(
                        { _id: req.body.raffleId },
                        { entered: entered + 1 }
                    );
                }
                let finalEtr = await Participants.findOne({
                    raffleId: req.body.raffleId,
                    UserId: req.body.userid,
                });

                let newUser = await Users.findOne({ _id: req.body.userid });
                return ReS(
                    res,
                    {
                        userid: userid,
                        raffleId: raffleId,
                        participants: finalEtr,
                        userLikedetails: userLikedetails,
                        retweetDetails: retweetDetails,
                        email_verified: newUser.email_verified,
                        twitter_verified: newUser.twitter_verified,
                    },
                    201
                );
            } else {
                console.log("in else");
                userLikedetails = await client.v2.userLikedTweets(
                    twitter_user_id
                );
                userLikedetails._realData.data.filter(
                    (e) => String(e.id) === String(tweet_id)
                ).length > 0
                    ? (userLikedetails = 1)
                    : (userLikedetails = 0);

                retweetDetails = await client.v2.tweetRetweetedBy(tweet_id);
                if (retweetDetails.meta.result_count != 0) {
                    retweetDetails.data.filter(
                        (e) => String(e.id) === String(twitter_user_id)
                    ).length > 0
                        ? (retweetDetails = 1)
                        : (retweetDetails = 0);
                } else {
                    retweetDetails = 0;
                }

                let jointime = moment().unix();
                var newParticipants = {
                    UserId: req.body.userid,
                    raffleId: req.body.raffleId,
                    jointime: jointime,
                    twiter_like: userLikedetails,
                    twiter_retweet: retweetDetails,
                };

                let raffleParticipants = await Participants.create(
                    newParticipants
                );
                let entry = await Participants.findOne({
                    raffleId: req.body.raffleId,
                    UserId: req.body.userid,
                });

                if (
                    entry.twiter_like == 1 &&
                    entry.twiter_retweet == 1 &&
                    user.email_verified == 1 &&
                    user.twitter_verified == 1
                ) {
                    let etr = await Participants.updateOne(
                        { _id: entry._id },
                        { isDone: 1 }
                    );
                    let entered = raffle.entered;
                    await Raffles.updateOne(
                        { _id: req.body.raffleId },
                        { entered: entered + 1 }
                    );
                }
                let finalEtr = await Participants.findOne({
                    raffleId: req.body.raffleId,
                    UserId: req.body.userid,
                });

                let newUser = await Users.findOne({ _id: req.body.userid });

                return ReS(
                    res,
                    {
                        userid: userid,
                        raffleId: raffleId,
                        participants: finalEtr,
                        userLikedetails: userLikedetails,
                        retweetDetails: retweetDetails,
                        email_verified: newUser.email_verified,
                        twitter_verified: newUser.twitter_verified,
                    },
                    201
                );
            }
        }
    }
};
module.exports.buyTicket = buyTicket;

const addParticipants = async (req, res) => {
    let data, message, updaterafle;
    let body = req.body;
    var newparticipant = {
        UserId: body.UserId,
        raffleId: body.raffleId,
        pricelistId: body.pricelistId,
        jointime: new Date(body.jointime).getTime(),
        ticket: body.ticket,
        address: body.address,
    };
    data = await Participants.create(newparticipant);
    message = "participant created successfully !!";
    return ReS(res, { data: data, message: message }, 201);
};
module.exports.addParticipants = addParticipants;

const getParticipants = async (req, res) => {
    let data, message;
    data = await Participants.find({})
        .populate("raffleId")
        .populate("pricelistId");
    return ReS(res, { participants: data }, 201);
};
module.exports.getParticipants = getParticipants;

const findParticipantById = async (req, res) => {
    let data, message, participantdata;
    const id = req.params.id;
    data = await Participants.find({ raffleId: id })
        .populate("raffleId")
        .populate("pricelistId");
    if (data) {
        participantdata = data;
        message = "Fetch participant data successfully !!!";
    }
    return ReS(res, { participantdata: participantdata }, 201);
};
module.exports.findParticipantById = findParticipantById;

const deleteParticipant = async (req, res) => {
    let data, message, delparticipant;
    const body = req.body;
    if (body.length > 1) {
        body.forEach(async (element) => {
            delparticipant = await Participants.deleteOne({ _id: element });
        });
    } else {
        delparticipant = await Participants.deleteOne({ _id: body });
    }

    if (delparticipant) {
        delparticipant = delparticipant;
        message = "Delete participant data successfully !!!";
    }
    return ReS(res, { delparticipant: delparticipant, message: message }, 201);
};
module.exports.deleteParticipant = deleteParticipant;

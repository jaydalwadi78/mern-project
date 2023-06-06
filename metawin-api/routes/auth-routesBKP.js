const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const axios = require("axios");
const RaffleData = require("../models/raffle");
// when login is successful, retrieve user info

router.get("/raffle", async (req, res) => {
    RaffleData.find({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                success: true,
                message: "successfully connected",
                raffleData: result,
            });
            // console.log(res.json);
        }
    });
});

router.get("/login/success", async (req, res) => {
    console.log("in login success");
    if (req.user) {
        var following_by = await followings(req.user.twitterId);
        var retweeted_by = await retweetedBy();
        var liked_by = await likedTweets(req.user.twitterId);
        var tweet_id = "1630108013804634114";
        // console.log("followings>>>>>>>", following_by);
        // console.log("retweeted by>>>>>>>>>>", retweeted_by);
        // console.log("liked tweets>>>>>>>", liked_by);
        following_by.data.filter((e) => e.id === "1437371846148558855").length > 0
            ? (following_by = true)
            : (following_by = false);

        retweeted_by.data.filter((e) => e.id === req.user.twitterId).length > 0
            ? (retweeted_by = true)
            : (retweeted_by = false);

        liked_by.data.filter((e) => e.id === tweet_id).length > 0
            ? (liked_by = true)
            : (liked_by = false);

        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            followings: following_by,
            retweeted: retweeted_by,
            liked: liked_by,
            cookies: req.cookies,
        });
    }
    console.log(res.json);
});

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

// const aaaa = async () => {
//   const req = await axios.get(
//     `https://api.twitter.com/2/users/by/username/NftUpcoming`,
//     {
//       headers: {
//         Accept: "application/json",
//         Authorization:
//           "Bearer AAAAAAAAAAAAAAAAAAAAALRAfQEAAAAAqnPKXAyg3QPfjdeqN3eXGQSR6J0%3DMv7s7lljixUKh5JzY6KK0mclmFbmkoEoe1eWzHjwolVaF25z8c",
//       },
//     }
//   );
//   console.log("data>>>>>>>>>>>", req.data);
//   return req.data;
// };


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

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate.",
    });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with twitter
router.get("/connect-twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
    "/twitter/callback",
    passport.authenticate("twitter", {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: "/auth/login/failed",
    })
);

module.exports = router;

const passport = require("passport");
const TwitterStrategy = require("passport-twitter");
const keys = require("./key");

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: keys.TWITTER_CONSUMER_KEY,
            consumerSecret: keys.TWITTER_CONSUMER_SECRET,
            //callbackURL: "https://raffle.upcomingnft.net/auth/twitter/callback",
            callbackURL: "http://192.168.1.11:5012/auth/twitter/callback",
        },
        function (token, tokenSecret, profile, done) {
            var user = {
                name: profile._json.name,
                screenName: profile._json.screen_name,
                twitterId: profile._json.id_str,
                profileImageUrl: profile._json.profile_image_url,
                token,
                tokenSecret
            };
            console.log("user>>>callback>>>", user);
            return done(null, user);
        }
    )
);

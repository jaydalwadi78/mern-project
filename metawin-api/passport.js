const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(
    new TwitterStrategy(
        {
            consumerKey: "consumerKey",
            consumerSecret: "consumerSecret",
            callbackURL: "http://localhost:8080/twitter/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

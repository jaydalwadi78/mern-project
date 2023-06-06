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
            consumerKey: "tv7ph9hV8wwsfnUuRUSAHSOQl",
            consumerSecret: "rRMcvSJUeCiU21i4J06wZnsZ11w5OuCEne1WERwiSuNYjZ3APd",
            callbackURL: "http://localhost:8080/twitter/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
        }
    )
);

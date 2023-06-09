const TWITTER_TOKENS = {
    TWITTER_CONSUMER_KEY: "TWITTER_CONSUMER_KEY",
    TWITTER_CONSUMER_SECRET: "TWITTER_CONSUMER_SECRET",
    TWITTER_ACCESS_TOKEN: "TWITTER_ACCESS_TOKEN",
    TWITTER_TOKEN_SECRET: "TWITTER_TOKEN_SECRET",
};

const SESSION = {
    COOKIE_KEY: "thisappisawesome",
};

const MONGODB = {
    MONGODB_URI: `mongodb://localhost:27017`,
};

const KEYS = {
    ...TWITTER_TOKENS,
    ...MONGODB,
    ...SESSION,
};

module.exports = KEYS;

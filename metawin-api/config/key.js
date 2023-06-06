const TWITTER_TOKENS = {
    TWITTER_CONSUMER_KEY: "tv7ph9hV8wwsfnUuRUSAHSOQl",
    TWITTER_CONSUMER_SECRET: "rRMcvSJUeCiU21i4J06wZnsZ11w5OuCEne1WERwiSuNYjZ3APd",
    TWITTER_ACCESS_TOKEN: "4544709165-2VXpMpmOc5WzimRhhWpQfPmLlsT3wmqcN3NFS2k",
    TWITTER_TOKEN_SECRET: "aHasrqjz2tdg1nwS4xeDiXr4gwshxuU9YWr2vy7DvNDak",
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

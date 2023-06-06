require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application 

CONFIG.MODE = process.env.MODE || 'dev';

CONFIG.MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/hotloots";
CONFIG.LOCAL_MONGO_URL = process.env.LOCAL_MONGO_URL || "mongodb://127.0.0.1:27017/hotloots";

// CONFIG.MONGO_URL = process.env.MONGO_URL || "mongodb://raffle:raffleUpcoming@178.33.152.131:27017/upcomingraffle?authSource=admin";
// CONFIG.LOCAL_MONGO_URL = process.env.LOCAL_MONGO_URL || "mongodb://raffle:raffleUpcoming@178.33.152.131:27017/upcomingraffle?authSource=admin";
CONFIG.PORT = process.env.PORT || 5001;
CONFIG.OPENSEA_KEY = process.env.OPENSEA_KEY || '8e1e1f45ad1e4dc5b25e93c735c404d8';
CONFIG.OPENSEA_API1 = process.env.OPENSEA_API1 || 'https://api.opensea.io/api/v1/';
CONFIG.OPENSEA_API2 = process.env.OPENSEA_API2 || '8e1e1f45ad1e4dc5b25e93c735c404d8';
CONFIG.SECRET_KEY = 'raffle';

module.exports = CONFIG;
require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application 

CONFIG.MODE = process.env.MODE || 'dev';

CONFIG.MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/hotloots";
CONFIG.LOCAL_MONGO_URL = process.env.LOCAL_MONGO_URL || "mongodb://127.0.0.1:27017/hotloots";

// CONFIG.MONGO_URL = process.env.MONGO_URL || "mongodb://raffle:raffleUpcoming@178.33.152.131:27017/upcomingraffle?authSource=admin";
// CONFIG.LOCAL_MONGO_URL = process.env.LOCAL_MONGO_URL || "mongodb://raffle:raffleUpcoming@178.33.152.131:27017/upcomingraffle?authSource=admin";
CONFIG.PORT = process.env.PORT || 5001;
CONFIG.OPENSEA_KEY = process.env.OPENSEA_KEY || 'OPENSEA_KEY';
CONFIG.OPENSEA_API1 = process.env.OPENSEA_API1 || 'OPENSEA_API1';
CONFIG.OPENSEA_API2 = process.env.OPENSEA_API2 || 'OPENSEA_API2';
CONFIG.SECRET_KEY = 'raffle';

module.exports = CONFIG;
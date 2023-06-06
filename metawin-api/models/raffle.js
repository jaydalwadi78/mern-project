const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection(
    "mongodb://raffle:raffleUpcoming@178.33.152.131:27017/upcomingraffle?authSource=admin"
);
autoIncrement.initialize(connection);

var raffleSchema = new mongoose.Schema(
    {
        name: String,
        raffletype: { type: Number, enum: [0, 1], default: 0 }, //"0"->'free' & "1"->'paid'
        status: { type: Number, enum: [0, 1], default: 1 }, //"0"->'ended' & "1"->'started'
        winnerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participants",
            default: null,
        },
        tweetId: String,
        winingamount: Number,
        amounttype: { type: Number, enum: [0, 1], default: 0 }, //"0"->'price' & "1"->'nft'
        raffleimage: String,
        total: Number,
        currency: { type: Number, enum: [0, 1], default: 1 }, //"0"->'ETH' & "1"->'USDT'
        entered: { type: Number, default: 0 },
        raffleOrder: Number,
        winnertype: { type: Number, enum: [0, 1], default: 0 }, //"0"->'Single' & "1"->'Multiple'
        description: String,
        featured: { type: Number, enum: [0, 1], default: 0 }, //"0"->'not - featured' & "1"->'featured'
        transaction: String,
    },
    {
        timestamps: true,
    }
);

raffleSchema.plugin(autoIncrement.plugin, {
    model: "Raffles",
    field: "autoraffleId",
    startAt: 1,
});

let Raffles = mongoose.model("Raffles", raffleSchema);
module.exports = { Raffles, raffleSchema };

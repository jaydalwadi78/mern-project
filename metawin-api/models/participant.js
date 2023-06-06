const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection(
    "mongodb://raffle:raffleUpcoming@178.33.152.131:27017/upcomingraffle?authSource=admin"
);
autoIncrement.initialize(connection);

var participantSchema = new mongoose.Schema(
    {
        UserId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffles" },
        pricelistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pricelists",
        },
        price: String,
        jointime: Number,
        ticket: Number,
        twiter_like: Number,
        twiter_retweet: Number,
        isDone: Number,
    },
    {
        timestamps: true,
    }
);

participantSchema.plugin(autoIncrement.plugin, {
    model: "Participants",
    field: "autoparticipantId",
    startAt: 1,
});

let Participants = mongoose.model("Participants", participantSchema);
module.exports = { Participants, participantSchema };

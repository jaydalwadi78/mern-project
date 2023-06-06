const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
var connection = mongoose.createConnection(
    "mongodb://raffle:raffleUpcoming@178.33.152.131:27017/upcomingraffle?authSource=admin"
);
autoIncrement.initialize(connection);

var pricelistSchema = new mongoose.Schema(
    {
        ticketno: Number,
        price: Number,
        ticketno2: Number,
        price2: Number,
        ticketno3: Number,
        price3: Number,
        raffleId: { type: mongoose.Schema.Types.ObjectId, ref: "Raffles" },
    },
    {
        timestamps: true,
    }
);

pricelistSchema.plugin(autoIncrement.plugin, {
    model: "Pricelists",
    field: "autopricelistId",
    startAt: 1,
});

let Pricelists = mongoose.model("Pricelists", pricelistSchema);
module.exports = { Pricelists, pricelistSchema };

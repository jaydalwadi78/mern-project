const mongoose = require('mongoose');
const Pricelists = require("../models/pricelist").Pricelists;
const { to, ReE, ReS } = require('../services/util.service');
const Web3 = require('web3');
const web3 = new Web3('wss://mainnet.infura.io/ws/v3/1835809e0e6a4de38eaf1f7afb51e0ec');
const CONFIG = require('../config/config');

/*var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connect = mongoose.connect(CONFIG.LOCAL_MONGO_URL, options);
connect.then((db) => {
    console.log('Connected correctly to mongo database server!');
}, (err) => {
    console.log(err);
});*/

const addPrice = async (req, res) => {
    let pricedata, message;
    let body = req.body;
    var newpricelist = {
        ticketno: body.ticketno,
        price: body.price,
        ticketno2: body.ticketno2,
        price2: body.price2,
        ticketno3: body.ticketno3,
        price3: body.price3,
        raffleId: body.raffleId,
    }
    pricedata = await Pricelists.create(newpricelist);
    message = "pricelist created successfully !!";
    return ReS(res, { pricedata: pricedata, message: message }, 201);
}
module.exports.addPrice = addPrice;

const getPrice = async (req, res) => {
    let getpricedetail;
    getpricedetail = await Pricelists.find({}).populate('raffleId').sort({ createdAt: -1 });
    //console.log("getpricedetail",getpricedetail);
    return ReS(res, { prices: getpricedetail }, 201);
}
module.exports.getPrice = getPrice;

const buyticket = async (req, res) => {
    let body = req.body;
    console.log("body", body);
}
module.exports.buyticket = buyticket;


const findPriceById = async (req, res) => {
    const id = req.params.id;
    let priceresult;
    priceresult = await Pricelists.findOne({ _id: id }).populate('raffleId');
    if (priceresult) {
        priceresult = priceresult;
        message = "Fetching Price Data successfully !!";
    }
    else {
        priceresult = null;
        message = "Fetching Data Not successfully !!";
    }
    return ReS(res, { priceresult: priceresult, message: message }, 201);
}
module.exports.findPriceById = findPriceById;

const findPriceByRaffle = async (req, res) => {
    const raffleid = req.params.id;
    let priceresult;
    priceresult = await Pricelists.find({ raffleId: raffleid }).sort({ ticketno: 1 }).populate('raffleId');
    return ReS(res, { priceresult: priceresult }, 201);
}
module.exports.findPriceByRaffle = findPriceByRaffle;

const updatePrice = async (req, res) => {
    const id = req.params.id;
    let updatepricedata, message;
    let body = req.body;
    updatepricedata = {
        ticketno: body.ticketno,
        price: body.price,
        ticketno2: body.ticketno2,
        price2: body.price2,
        ticketno3: body.ticketno3,
        price3: body.price3,
        raffleId: body.raffleId
    }

    const updatepriceresult = await Pricelists.updateOne({ _id: id }, { $set: updatepricedata });
    if (updatepriceresult) {
        message = "Price Detail Updated successfully !!";
    }
    return ReS(res, { updatepricedata, updatepricedata, message: message }, 201);
}
module.exports.updatePrice = updatePrice;

const deletePrice = async (req, res) => {
    let delprice, message;
    let body = req.body;

    if (body.length > 1) {
        body.forEach(async (element) => {
            delprice = await Pricelists.deleteOne({ _id: element });
        });
    } else {
        delprice = await Pricelists.deleteOne({ _id: body });

    }

    if (delprice) {
        delprice = delprice;
        message = "Deleted Price Data successfully !!";
    }
    return ReS(res, { message: message }, 201);
}
module.exports.deletePrice = deletePrice;


const findNewPriceById = async (req, res) => {
    const raffleid = req.params.id;
    let priceresult;
    priceresult = await Pricelists.find({ raffleId: raffleid });
    return ReS(res, { priceresult: priceresult }, 201);
}
module.exports.findNewPriceById = findNewPriceById;
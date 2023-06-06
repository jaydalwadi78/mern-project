const mongoose = require("mongoose");
const Web3 = require("web3");
const fs = require("fs");
const Users = require("../models/user").Users;
const Raffles = require("../models/raffle").Raffles;
const Participants = require("../models/participant").Participants;
const moment = require("moment");
const base64Img = require("base64-img");
const path = require("path");
var isBase64 = require("is-base64");
const contractAddress = "0x4d53770dECd430F5FB6c04bcc9d56f050AcDac53";
const contractabi = require("../contractAbi/abi.json");
const { to, ReE, ReS } = require("../services/util.service");
var __dirname = __dirname;
var parentdirname = process.cwd();
const CONFIG = require("../config/config");

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

function getBase64FileExtension(base64String) {
    switch (base64String.charAt(0)) {
        case "/":
            return "jpg";
        case "i":
            return "png";
        case "R":
            return "gif";
        case "U":
            return "webp";
        case "J":
            return "pdf";
        default:
            return "unknown";
    }
}

const addRaffles = async (req, res) => {
    // const web3 = new Web3('https://goerli.infura.io/v3/31c0cfa2cc274e94b75e61a6f18d44f2');
    // const myContract = await new web3.eth.Contract(contractabi, contractAddress);

    // let aaprice = web3.utils.toWei(String(1000000000000000), "ether");

    // let bbprice = web3.utils.toWei(String(0), "ether");

    // const address = "0xbB85c48384c2f1544B228512A29589B2c78586ba";
    // const _raffleid = 2;
    // const _priceList = [[1, 1, aaprice]];

    // await myContract.methods.createRaffle(_raffleid, _priceList).send({
    // 	from: address
    // });

    //console.log("myContract>>>>>>", myContract);

    let raffle, message, newraffle, raffleimage, newraffimg;
    let body = req.body;
    raffleimage =
        moment().format("x") + "_" + Math.floor(1000 + Math.random() * 9000);
    if (body.raffleimage != "") {
        base64Img.img(
            body.raffleimage,
            parentdirname + "/assets/raffleimage",
            raffleimage,
            function (err, filepath) { }
        );
        const extension = getBase64FileExtension(
            body.raffleimage.split(",")[1]
        );
        newraffimg = raffleimage + "." + extension;
    }

    newraffle = {
        name: body.name,
        description: body.description,
        starttime: body.starttime ? new Date(body.starttime).getTime() : null,
        endtime: body.endtime ? new Date(body.endtime).getTime() : null,
        raffletype: body.raffletype,
        amounttype: body.amounttype,
        winingamount: body.winingamount ? body.winingamount : null,
        contractaddress: body.contractaddress ? body.contractaddress : null,
        tokenId: body.tokenId ? body.tokenId : null,
        raffleimage: newraffimg,
        winnertype: body.winnertype,
        winingcount: body.winingcount,
        tweetId: body.tweetId,
    };
    raffle = await Raffles.create(newraffle);

    message = "Raffle created successfully !!";
    return ReS(res, { raffle: raffle, message: message }, 201);
};
module.exports.addRaffles = addRaffles;

const getRaffles = async (req, res) => {
    let getdata, participantdata, participantcount;
    getdata = await Raffles.find({ status: 1 }).sort({ autoraffleId: 1 }).lean();

    let raffles = await Promise.all(
        getdata.map(async (raffle) => {
            participantdata = await Participants.find({
                raffleId: raffle._id,
                isDone: 1,
            })
                .populate("raffleId")
                .populate("pricelistId")
                .lean();
            raffle.participantcount = participantdata.length;
            raffle.participants = participantdata;
            //console.log("raffles>>>", raffle);
            return raffle;
        })
    );
    return ReS(res, { raffles: raffles }, 201);
};
module.exports.getRaffles = getRaffles;

const getRafflesAdmin = async (req, res) => {
    console.log("res>>>>", req.body);
    console.log("postData>>>>", req.body);
    let page = req.body.currentPage;
    let limit = req.body.limit;
    let order = req.body.order;
    let orderBy = req.body.orderBy;
    let newOrder = order === 'asc' ? -1 : 1;

    // console.log("order>>", order);
    // console.log("orderBy>>", orderBy);
    // console.log("newOrder>>", newOrder);

    try {
        // execute query with page and limit values
        const getdata = await Raffles.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }).lean()
            .exec();

        // console.log("getdata>>>>", getdata);


        //const getdata = await Raffles.find().sort({ orderBy: 1 })	


        // var getdata = await Raffles.find()
        // 	.limit(limit * 1).
        // 	skip((page - 1) * limit)
        // 	.sort({ orderBy: newOrder })
        // 	.lean()
        // 	.exec();

        // console.log("getdata>>>>", getdata);

        // if (order !== undefined) {
        // 	var getdata = await Raffles.find()
        // 		.limit(limit * 1)
        // 		.skip((page - 1) * limit)
        // 		.sort({ orderBy: newOrder }).lean()
        // 		.exec();
        // } else {
        // 	var getdata = await Raffles.find()
        // 		.limit(limit * 1).
        // 		skip((page - 1) * limit)
        // 		.sort({ orderBy: newOrder })
        // }


        // get total documents in the Posts collection 
        const count = await Raffles.count();

        // return response with posts, total pages, and current page
        let raffles = await Promise.all(getdata.map(async (raffle) => {
            participantdata = await Participants.find({ "raffleId": raffle._id }).populate("raffleId").populate("pricelistId").lean();
            raffle.participantcount = participantdata.length;
            raffle.participants = participantdata;
            //console.log("raffles>>>", raffle);
            return raffle;
        }));

        let pageTotal = Math.ceil(count / limit);
        let recordsTotal = count;
        //let currentPage = page;
        return ReS(res, { raffles: raffles, pageTotal: pageTotal, recordsTotal: recordsTotal }, 201);
    } catch (err) {
        console.error(err.message);
    }
}
module.exports.getRafflesAdmin = getRafflesAdmin;

// const getRafflesAdmin = async (req, res) => {
//     console.log("res>>>>", req.body);
//     let skip = req.body.currentPage * 5;
//     let getdata, participantdata, participantcount;
//     console.log("skip>>>", skip);
//     getdata = await Raffles.find({}).sort({ createdAt: -1 }).lean();

//     let raffles = await Promise.all(getdata.map(async (raffle) => {
//         participantdata = await Participants.find({ "raffleId": raffle._id }).populate("raffleId").populate("pricelistId").lean();
//         raffle.participantcount = participantdata.length;
//         raffle.participants = participantdata;
//         //console.log("raffles>>>", raffle);
//         return raffle;
//     }));

//     console.log("raffles>>", raffles);
//     return ReS(res, { raffles: raffles }, 201);
// }
// module.exports.getRafflesAdmin = getRafflesAdmin;

const rafflebySession = async (req, res) => {
    const id = req.params.id;
    const uid = req.params.uid;
    let participant, raffresult;

    participant = await Participants.findOne({
        raffleId: id,
        UserId: uid,
    }).lean();
    raffresult = await Raffles.findOne({ _id: id }).lean();
    return ReS(res, { raffresult: raffresult, participant: participant }, 201);
};
module.exports.rafflebySession = rafflebySession;

const findRaffleById = async (req, res) => {
    const id = req.params.id;
    let raffresult;
    raffresult = await Raffles.findOne({ _id: id }).lean();
    if (raffresult) {
        raffresult = raffresult;
        message = "Fetching Raffle Data successfully !!";
    } else {
        raffresult = null;
        message = "Fetching Data Not successfully !!";
    }
    return ReS(res, { raffresult: raffresult, message: message }, 201);
};
module.exports.findRaffleById = findRaffleById;

const deleteRaffles = async (req, res) => {
    let delraffle, message;
    let body = req.body;
    if (body.length > 1) {
        body.forEach(async (element) => {
            const raffresult = await Raffles.findOne({ _id: element });
            fs.unlink(
                parentdirname + "/assets/raffleimage/" + raffresult.raffleimage,
                (err) => {
                    if (err) console.log(err);
                    else {
                        console.log("\nDeleted file: example_file.txt");
                    }
                }
            );
            delraffle = await Raffles.deleteOne({ _id: element });
        });
    } else {
        const raffresult = await Raffles.findOne({ _id: body });
        fs.unlink(
            parentdirname + "/assets/raffleimage/" + raffresult.raffleimage,
            (err) => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file: example_file.txt");
                }
            }
        );
        delraffle = await Raffles.deleteOne({ _id: raffresult._id });
    }
    if (delraffle) {
        delraffle = delraffle;
        message = "Deleted Raffle Data successfully !!";
    }
    return ReS(res, { delraffle: delraffle, message: message }, 201);
};
module.exports.deleteRaffles = deleteRaffles;

const updateRaffle = async (req, res) => {
    const id = req.params.id;
    let updateraffledata, message, newraffleimage;
    let body = req.body;
    var isBase64Valid = isBase64(body.raffleimage, { mimeRequired: true }); // base64Data is the base64 string

    if (isBase64Valid == true) {
        // true if base64 formate
        base64_result = true;
        newraffleimage =
            moment().format("x") +
            "_" +
            Math.floor(1000 + Math.random() * 9000);
        console.log("newraffleimage", newraffleimage);
        const extension = getBase64FileExtension(
            body.raffleimage.split(",")[1]
        );
        base64Img.img(
            body.raffleimage,
            parentdirname + "/assets/raffleimage",
            newraffleimage,
            function (err, filepath) { }
        );
        newraffleimage = newraffleimage + "." + extension;
    } else {
        // false if not in base64 formate
        base64_result = false;
        newraffleimage = body.raffleimage;
    }
    updateraffledata = {
        name: body.name,
        description: body.description,
        starttime: new Date(body.starttime).getTime(),
        endtime: new Date(body.endtime).getTime(),
        raffletype: body.raffletype,
        amounttype: body.amounttype,
        winingamount: body.winingamount ? body.winingamount : null,
        contractaddress: body.contractaddress ? body.contractaddress : null,
        tokenId: body.tokenId ? body.tokenId : null,
        raffleimage: newraffleimage ? newraffleimage : null,
        winnertype: body.winnertype,
        winingcount: body.winingcount,
        tweetId: body.tweetId,
    };

    const result = await Raffles.updateOne(
        { _id: id },
        { $set: updateraffledata }
    );

    if (result) {
        message = "Raffle Detail Updated successfully !!";
    }
    return ReS(
        res,
        { updateraffledata: updateraffledata, message: message },
        201
    );
};
module.exports.updateRaffle = updateRaffle;

const deleteImage = async (req, res) => {
    let message, delresult, updatedresult;
    const id = req.params.id;

    const raffresult = await Raffles.findOne({ _id: id });
    fs.unlink(
        parentdirname + "/assets/raffleimage/" + raffresult.raffleimage,
        (err) => {
            if (err) console.log(err);
            else {
            }
        }
    );
    delresult = await Raffles.findOneAndUpdate(
        { _id: id },
        { raffleimage: null },
        { upsert: false }
    );
    updatedresult = await Raffles.findOne({ _id: id });
    if (updatedresult) {
        updatedresult = updatedresult;
        message = "Raffle image deleted successfully !!";
    }
    return ReS(res, { message: message, updatedresult: updatedresult }, 201);
};

module.exports.deleteImage = deleteImage;

const getDashboardData = async (req, res) => {
    totalRaffles = await Raffles.count();
    totalUsers = await Users.count();
    totalParticipants = await Participants.find({ isDone: 1 }).count();
    return ReS(
        res,
        {
            totalRaffles: totalRaffles,
            totalUsers: totalUsers,
            totalParticipants: totalParticipants,
        },
        201
    );
};
module.exports.getDashboardData = getDashboardData;

const fetchparticipants = async (req, res) => {
    const id = req.params.id;
    let raffresult;

    raffresult = await Participants.find({ raffleId: id, isDone: 1 })
        .populate({
            path: "UserId",
            select: "name twitter_screen_name",
            match: { _id: { $ne: null } },
        })
        .populate({ path: "raffleId" })
        .lean();

    console.log("raffresult>>>", raffresult);
    if (raffresult) {
        raffresult = raffresult;
        message = "Fetch participant data successfully !!!";
    }
    return ReS(res, { raffresult: raffresult, message: message }, 201);
};
module.exports.fetchparticipants = fetchparticipants;

const getRaffleSlider = async (req, res) => {
    const id = await req.body.id;
    let getdata, participantdata, participantcount;
    getdata = await Raffles.find({ _id: { $nin: [id] } })
        .lean()
        .limit(4);

    let raffles = await Promise.all(
        getdata.map(async (raffle) => {
            participantdata = await Participants.find({ raffleId: raffle._id })
                .populate("raffleId")
                .populate("pricelistId")
                .lean();
            raffle.participantcount = participantdata.length;
            raffle.participants = participantdata;
            return raffle;
        })
    );

    return ReS(res, { raffles: raffles }, 201);
};
module.exports.getRaffleSlider = getRaffleSlider;

const setWinner = async (req, res) => {
    const id = req.body.raffleId;
    let updateraffledata, message;
    let body = req.body;
    updateraffledata = {
        winnerId: body.winnerId,
        transaction: body.transaction,
        status: 0,
    };
    const result = await Raffles.updateOne(
        { _id: id },
        { $set: updateraffledata }
    );

    if (result) {
        message = "Raffle winner set successfully !!";
    }
    return ReS(
        res,
        { updateraffledata: updateraffledata, message: message },
        201
    );
};
module.exports.setWinner = setWinner;

const getCloseRaffles = async (req, res) => {
    let closeRaffles;
    closeRaffles = await Raffles.find({ status: 0 }).lean();

    if (closeRaffles) {
        let allRaffles = await Promise.all(
            closeRaffles.map(async (raffle, ind) => {
                let winId = raffle.winnerId;
                let winnerUser = await Users.findOne({ _id: winId }).select("name").lean();

                let participantdata = await Participants.find({ "raffleId": raffle._id }).populate("raffleId").populate("pricelistId").lean();
                raffle.participantcount = participantdata.length;
                raffle.winnerUser = winnerUser;

                console.log("participantdata>>", participantdata);
                return raffle;
            }));
        console.log("allRaffles>>", allRaffles);
        return ReS(res, { allRaffles: allRaffles }, 201);
    } else {
        return ReS(res, { allRaffles: [] }, 201);
    }
};
module.exports.getCloseRaffles = getCloseRaffles;


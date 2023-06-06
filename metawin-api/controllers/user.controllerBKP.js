const mongoose = require("mongoose");
const moment = require("moment");
const Users = require("../models/user").Users;
const axios = require("axios");
const { to, ReE, ReS } = require("../services/util.service");
const registerChatHandlers = require("./chat");
const Web3 = require("web3");
const ETH_PROVIDER =
    "https://mainnet.infura.io/v3/7180015da57e4d888a5db2e7169ce7f8";
const web3 = new Web3(ETH_PROVIDER);
const bops = require("bops");
var Sendy = require("sendy-api");
const CryptoJS = require("crypto-js");
const CONFIG = require("../config/config");
const sendy = new Sendy("https://upcomingnft.agency/", "c01Xv8RdP2Hbqnpvi4J9");
const qs = require("qs");
const Participants = require("../models/participant").Participants;
const Raffles = require("../models/raffle").Raffles;
const fs = require("fs");
var SibApiV3Sdk = require("sib-api-v3-sdk");
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    "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";

/*var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connect = mongoose.connect(CONFIG.LOCAL_MONGO_URL, options);
connect.then((db) => {
    console.log('Connected correctly to mongo database serve r!');
}, (err) => {
    console.log(err);
});*/

const signupUser = async (req, res) => {
    let user, message;
    let body = req.body;

    const search = body.address ? { address: body.address.toLowerCase() } : {};

    user = await Users.findOne(search);
    if (user) {
        user = user;
        message = "User login successfully !!";
    } else {
        body.address = body.address.toLowerCase();
        body.isEmailVerified = false;

        user = await Users.create(body);
        message = "User created successfully !!";
    }
    return ReS(res, { user: user, message: message }, 201);
};

module.exports.signupUser = signupUser;

const resubscribe = async (req, res) => {
    let emailresult, emailexistuser;
    let body = req.body;
    console.log("email", body.email);
    console.log("body ", body);

    var params = {
        api_key: "c01Xv8RdP2Hbqnpvi4J9",
        list_id: "wjGN4892i8XVZ8921j8925CIg4BA",
        email: body.email,
    };

    const data = qs.stringify(params);

    let config = {
        method: "post",
        url: `https://upcomingnft.agency/api/subscribers/delete.php`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
    };

    let axiosSendy = await axios(config);

    if (axiosSendy) {
        var sendy_params = {
            email: body.email,
            name: body.name,
            list_id: "wjGN4892i8XVZ8921j8925CIg4BA",
            api_key: "c01Xv8RdP2Hbqnpvi4J9",
        };

        setTimeout(() => {
            sendy.subscribe(sendy_params, async function (err, result) {
                if (err) console.log(err.toString());
                else {
                    emailresult = result;
                    emailexistuser = await Users.findOne({ email: body.email });
                }
                return ReS(
                    res,
                    {
                        emailexistuser: emailexistuser,
                        emailresult: emailresult,
                    },
                    201
                );
            });
        }, 1500);
    }
};
module.exports.resubscribe = resubscribe;

const verifymail = async (req, res) => {
    const body = req.body;
    emailexistuser = await Users.findOne({ email: body.email });
    if (emailexistuser) {
        await Users.updateOne({ email: body.email }, { email_verified: 1 });
    }
    emailexistuser = await Users.findOne({ email: body.email });
    return ReS(res, { emailexistuser: emailexistuser }, 201);
};

module.exports.verifymail = verifymail;

function generateString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    return result;
}

const forgotUser = async (req, res) => {
    let message, user;
    let body = req.body;

    user = await Users.findOne({ email: body.email });
    if (user) {
        let randomStr = generateString(32);
        let excount = user.resetcount ? user.resetcount : 0;
        await Users.updateOne(
            { _id: user._id },
            { resetcode: randomStr, resetcount: excount + 1 }
        );
        let resetUrll = `http://raffle.upcomingnft.net/reset/${randomStr}`;
        await sendForgotmail(user.name, body.email, resetUrll);

        user = await Users.findOne({ email: body.email });
        return ReS(
            res,
            { userUpdated: user, randomStr: randomStr, message: message },
            201
        );
    } else {
        message = "Email is not exist";
        return ReE(res, { userUpdated: {}, message: message }, 201);
    }
};

module.exports.forgotUser = forgotUser;

const resetPassword = async (req, res) => {
    let message, user;
    let body = req.body;

    let pwd = CryptoJS.AES.encrypt(body.password, CONFIG.SECRET_KEY).toString();

    user = await Users.findOne({ resetcode: body.code });
    if (user) {
        await Users.updateOne({ _id: user._id }, { password: pwd });

        user = await Users.findOne({ _id: user._id });
        return ReS(res, { userUpdated: user }, 201);
    } else {
        message = "Please try after some time";
        return ReE(res, { userUpdated: {}, message: message }, 201);
    }
};

module.exports.resetPassword = resetPassword;

const checkExist = async (req, res) => {
    let user, existingNonce;
    let body = req.body;
    let address = body.address.toLowerCase();

    user = await Users.findOne({ address: address });

    if (user) {
        existingNonce = Math.floor(Math.random() * 1000000).toString();
        await Users.updateOne({ _id: user._id }, { userNounce: existingNonce });
    } else {
        existingNonce = Math.floor(Math.random() * 1000000).toString();
        let newUser = {
            address: address,
            userNounce: existingNonce,
        };
        user = await Users.create(newUser);
        console.log("user >>>>>>> ", user);
    }

    let userUpdated = await Users.findOne({ address: address });
    return ReS(res, { user: userUpdated, nonce: existingNonce }, 201);
};

module.exports.checkExist = checkExist;

const checkExistEmail = async (req, res) => {
    let newUser, message, user;
    let body = req.body;
    let pwd = CryptoJS.AES.encrypt(body.password, CONFIG.SECRET_KEY).toString();
    user = await Users.findOne({ email: body.email });

    var sendy_params = {
        email: body.email,
        list_id: "wjGN4892i8XVZ8921j8925CIg4BA",
        api_key: "c01Xv8RdP2Hbqnpvi4J9",
        name: body.name,
    };

    if (user) {
        if (user.email_verified !== 1) {
            sendy.unsubscribe(sendy_params, async function (err, result) {
                if (err) console.log(err.toString());
                else {
                }
            });

            sendy.subscribe(sendy_params, async function (err, result) {
                if (err) console.log(err.toString());
                else {
                }
            });
        }
        message = "Email Already Exist";
        return ReE(res, { userUpdated: {}, message: message }, 201);
    } else {
        if (body.ethAddress) {
            let addr = body.ethAddress.toLowerCase();
            walletUser = await Users.findOne({ address: addr });

            if (walletUser) {
                message = "Wallet address Already Registered !";
                return ReE(res, { userUpdated: {}, message: message }, 201);
            } else {
                newUser = {
                    name: body.name,
                    email: body.email,
                    password: pwd,
                    address: body.ethAddress,
                    busd_address: body.busdAddress,
                    email_verified: 0,
                    twitter_verified: 0,
                };
                //isEmailVerified:true
                user = await Users.create(newUser);
                message = "Email Created successfully";

                if (user) {
                    sendy.subscribe(sendy_params, async function (err, result) {
                        if (err) console.log(err.toString());
                    });
                }

                let userUpdated = await Users.findOne({ email: body.email });
                return ReS(
                    res,
                    { userUpdated: userUpdated, message: message },
                    201
                );
            }
        } else {
            newUser = {
                name: body.name,
                email: body.email,
                password: pwd,
                email_verified: 0,
                twitter_verified: 0,
            };
            //isEmailVerified:true
            user = await Users.create(newUser);
            message = "Email Created successfully";

            if (user) {
                sendy.subscribe(sendy_params, async function (err, result) {
                    if (err) console.log(err.toString());
                });
            }

            let userUpdated = await Users.findOne({ email: body.email });
            return ReS(
                res,
                { userUpdated: userUpdated, message: message },
                201
            );
        }
    }
};
module.exports.checkExistEmail = checkExistEmail;

const loginUser = async (req, res) => {
    let newUser, message, user;
    let body = req.body;

    user = await Users.findOne({ email: body.email });
    if (user) {
        let existPwd = CryptoJS.AES.decrypt(
            user.password,
            CONFIG.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        if (existPwd === body.password) {
            message = "Login successfully";
            let userUpdated = await Users.findOne({ email: body.email });
            return ReS(
                res,
                { userUpdated: userUpdated, message: message },
                201
            );
        } else {
            message = "Invalid Password";
            let userUpdated = await Users.findOne({ email: body.email });
            return ReE(res, { userUpdated: {}, message: message }, 201);
        }
    } else {
        message = "Invalid Login";
        return ReE(res, { userUpdated: {}, message: message }, 201);
    }
};
module.exports.loginUser = loginUser;

const verifySign = async (req, res) => {
    let user, existingNonce, userSignature, verifyUser;
    let body = req.body;

    address = body.address.toLowerCase();
    existingNonce = body.userNounce;
    userNounceHash = body.userNounceHash;
    userSignature = body.userSignature;

    let hexCode = `Sign message to login \nMetawin with nonce: ${userNounceHash}`;

    let signature = await web3.eth.accounts.recover(hexCode, userSignature);

    if (signature.toLowerCase() === address) {
        verifyUser = true;
    } else {
        verifyUser = false;
    }
    user = await Users.findOne({ address: address });

    return ReS(res, { verifyuser: verifyUser, user: user }, 201);
};

module.exports.verifySign = verifySign;

const updateUser = async (req, res) => {
    let userid = req.body.user_id;
    let name = req.body.name;
    let busd_address = req.body.busd_address;
    let ethAddress = req.body.address;
    let email = req.body.email;

    await Users.updateOne(
        { _id: userid },
        {
            name: name,
            address: ethAddress,
            busd_address: busd_address,
            email: email,
        }
    );

    let userUpdatednew = await Users.findOne({ _id: userid });
    message = "Profile Update successfully";
    return ReS(res, { userUpdated: userUpdatednew, message: message }, 201);
};

module.exports.updateUser = updateUser;

const userbyId = async (req, res) => {
    let user;
    let userid = req.body.user_id;

    user = await Users.findOne({ _id: userid });
    return ReS(res, { user: user }, 201);
};

module.exports.userbyId = userbyId;

const userraffles = async (req, res) => {
    let raffles;
    let userid = req.body.user_id;
    raffles = await Participants.find({ UserId: userid });
    return ReS(res, { raffles: raffles }, 201);
};

module.exports.userraffles = userraffles;

const sendForgotmail = async (name, mail, resetUrll) => {
    let htmlContent = fs.readFileSync(__dirname + "/reset.html", "utf8");
    htmlContent = htmlContent.replace("{name}", name);
    htmlContent = htmlContent.replace("{url}", resetUrll);

    new SibApiV3Sdk.TransactionalEmailsApi()
        .sendTransacEmail({
            subject: "Upcoming Raffle: Reset Password!",
            sender: {
                email: "raffle@upcomingnft.net",
                name: "Upcomingnft Raffle",
            },
            replyTo: {
                email: "raffle@upcomingnft.net",
                name: "Upcomingnft Raffle",
            },
            to: [{ name: name, email: mail }],
            htmlContent: htmlContent,
            params: { bodyMessage: "Made just for you!" },
        })
        .then(
            function (data) {
                console.log(data);
            },
            function (error) {
                console.error(error);
            }
        );
};

const getUser = async (req, res) => {
    var getdata = await Users.find({}).sort({ createdAt: -1 }).lean();
    let users = await Promise.all(
        getdata.map(async (raffle) => {
            raffledata = await Participants.find({
                UserId: raffle._id,
                isDone: 1,
            }).lean();
            raffle.rafflecount = raffledata.length;
            raffle.raffles = raffledata;
            return raffle;
        })
    );
    return ReS(res, { users: users }, 201);
};
module.exports.getUser = getUser;

const findUserAllRaffleById = async (req, res) => {
    const id = req.params.id;
    let raffresult;

    raffresult = await Participants.find({ UserId: id })
        .populate({ path: "UserId", select: "name" })
        .populate({ path: "raffleId", select: "name winingamount" })
        .lean();

    if (raffresult) {
        raffresult = raffresult;
        message = "Fetching User Data successfully !!";
    } else {
        raffresult = null;
        message = "Fetching User Not successfully !!";
    }
    return ReS(res, { raffresult: raffresult, message: message }, 201);
};
module.exports.findUserAllRaffleById = findUserAllRaffleById;

const findUserRaffleById = async (req, res) => {
    const id = req.params.id;
    let raffresult;
    raffresult = await Users.findOne({ _id: id }).lean();
    let password = CryptoJS.AES.decrypt(
        raffresult.password,
        CONFIG.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
    raffresult.password = password;
    if (raffresult) {
        raffresult = raffresult;
        message = "Fetching User Data successfully !!";
    } else {
        raffresult = null;
        message = "Fetching User Not successfully !!";
    }
    return ReS(res, { raffresult: raffresult, message: message }, 201);
};
module.exports.findUserRaffleById = findUserRaffleById;

const deleteUsers = async (req, res) => {
    let deluser, message;
    let body = req.body;
    if (body.length > 1) {
        body.forEach(async (element) => {
            deluser = await Users.deleteOne({ _id: element });
        });
    } else {
        deluser = await Users.deleteOne({ _id: body });
    }

    if (deluser) {
        deluser = deluser;
        message = "Deleted User successfully !!";
    }
    return ReS(res, { message: message }, 201);
};
module.exports.deleteUsers = deleteUsers;

const findActivity = async (req, res) => {
    const userid = req.body.userid;
    let activities;
    // ObjectId('641c5094bd79f4bac11474a8')

    activities = await Participants.find({ UserId: userid })
        .populate({ path: "UserId", select: "name address" })
        .populate({ path: "raffleId", select: "_id name winingamount total currency" })
        .lean();

    return ReS(res, { activities: activities }, 201);
};
module.exports.findActivity = findActivity;



const userwinnerById = async (req, res) => {
    let user;
    let getdata, participantdata, participantcount;
    const userid = req.params.id;
    user = await Users.findOne({ _id: userid });

    winnerRaffle = await Raffles.find({ winnerId: userid }).lean();
    if (winnerRaffle) {
        winnerRaffle = winnerRaffle;
        message = "Fetching Winner Raffle Data successfully !!";
    } else {
        winnerRaffle = null;
        message = "Fetching Winner Raffle Data Not successfully !!";
    }


    //getdata = await Raffles.find({ winnerId: userid }).lean();

    // getdata = await Participants.find({ UserId: userid }).select("raffleId").lean();

    // console.log("getdata>>>", getdata);

    // let winnerParticipationn = await Promise.all(
    //     getdata.map(async (raffle) => {
    //         raffledata = await Raffles.find({
    //             _id: raffle.raffleId,
    //             isDone: 1,
    //         })
    //             .populate("_id")
    //             .lean();
    //         participantdata = raffledata;
    //         console.log("participantdata>>", participantdata);
    //         return participantdata;
    //     })
    // );

    winnerParticipationn = await Participants.find({ UserId: userid, isDone: 1 })
        .populate({ path: "UserId", select: "name address" })
        .populate({ path: "raffleId", select: "_id name winingamount total currency" })
        .lean();


    // getdata.forEach(async (raffle, ind) => {
    //     let winnerUser = await Raffles.find({
    //         _id: .winnerId,
    //     })
    //         .select("name")
    //         .lean();
    //     raffle = { ...raffle, winnerUser: winnerUser };
    // });


    console.log("participantdataparticipantdataparticipantdata>>>", winnerParticipationn);

    return ReS(res, { user: user, winnerRaffle: winnerRaffle, winnerParticipation: winnerParticipationn }, 201);
};

module.exports.userwinnerById = userwinnerById;


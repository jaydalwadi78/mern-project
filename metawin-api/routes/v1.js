const express = require("express");
const router = express.Router();
const passport = require("passport");
//const CLIENT_HOME_PAGE_URL = "http://localhost:3000?twitter=true";
const CLIENT_HOME_PAGE_URL = "https://raffle.upcomingnft.net?twitter=true";

const UserController = require("../controllers/user.controller");
const AdminController = require("../controllers/admin.controller");
const RaffleController = require("../controllers/raffle.controller");
const PriceController = require("../controllers/pricelist.controller");
const ParticipantController = require("../controllers/participant.controller");
const TwitterController = require("../controllers/twitter.controller");

router.get("/", function (req, res, next) {
  res.json({
    status: "success",
    message: "Invalid Request",
    data: { version_number: "v1.0.0" },
  });
});

router.post("/signup", UserController.signupUser);
router.post("/checkExist", UserController.checkExist);
router.post("/checkExistEmail", UserController.checkExistEmail);
router.post("/resubscribe", UserController.resubscribe);
router.post("/verifymail", UserController.verifymail);
router.post("/verifySign", UserController.verifySign);
router.get("/getUser", UserController.getUser);
router.post("/loginUser", UserController.loginUser);
router.post("/userbyId", UserController.userbyId);
router.post("/updateUser", UserController.updateUser);
router.post("/userraffles", UserController.userraffles);
router.post("/forgotUser", UserController.forgotUser);
router.post("/resetPassword", UserController.resetPassword);
router.get("/findUserAllRaffleById/:id", UserController.findUserAllRaffleById);
router.get("/findUserRaffle/:id", UserController.findUserRaffleById);
router.post("/deleteUsers", UserController.deleteUsers);
router.post("/activities", UserController.findActivity)
//router.get("/user-winner/:id", UserController.userwinnerById)
router.get("/userwinnerById/:id", UserController.userwinnerById)

/*admin signin*/
router.post("/signin", AdminController.signinadmin);

/*Add raffle */
router.post("/createRaffle", RaffleController.addRaffles);
router.get("/getRaffle", RaffleController.getRaffles);
router.post("/getRafflesAdmin", RaffleController.getRafflesAdmin);
router.get("/findRaffle/:id", RaffleController.findRaffleById);
router.get("/rafflebySession/:id/:uid", RaffleController.rafflebySession);
router.post("/updateRaffle/:id", RaffleController.updateRaffle);
router.post("/deleteImage/:id", RaffleController.deleteImage);
router.post("/deleteRaffles", RaffleController.deleteRaffles);
router.get("/getDashboardData", RaffleController.getDashboardData);
router.get("/fetchparticipants/:id", RaffleController.fetchparticipants);
router.post("/getRaffleSlider", RaffleController.getRaffleSlider);
router.post("/setWinner", RaffleController.setWinner);
router.post("/getWinners", RaffleController.getCloseRaffles);


/*Add pricelist */
router.post("/addPrice", PriceController.addPrice);
router.get("/getPrice", PriceController.getPrice);
router.get("/findPrice/:id", PriceController.findPriceById);
router.get("/findNewPrice/:id", PriceController.findNewPriceById);
router.post("/updatePrice/:id", PriceController.updatePrice);
router.post("/deletePrice/", PriceController.deletePrice);
router.get("/FetchPrice/:id", PriceController.findPriceByRaffle);
// router.post("/buyticket", PriceController.buyticket);

/*Add participant */
router.post("/addParticipant", ParticipantController.addParticipants);
router.get("/getParticipants", ParticipantController.getParticipants);
router.get("/findParticipant/:id", ParticipantController.findParticipantById);
router.post("/deleteParticipant", ParticipantController.deleteParticipant);
router.post("/buyTicket", ParticipantController.buyTicket);

/*Add twiiter */
router.get("/login/success", TwitterController.login);
router.get("/logout", TwitterController.logout);
router.get("/login/failed", TwitterController.loginFailed);
router.get("/connect-twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;

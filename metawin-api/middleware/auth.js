const isLoggedIn = (req, res, next) => {
    console.log("req", req);
    if (req.user) {
        console.log("here");
        next();
    } else {
        res.status(401).send("Not Logged In");
    }
};
module.exports = isLoggedIn;

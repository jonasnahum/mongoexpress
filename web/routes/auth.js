var express = require('express');
var router = express.Router();
var passport = require ("passport");
var passportLocal = require ("passport-local");

passport.use(new passportLocal.Strategy(function(username, password, done){
    //pretend this is using a real database.
    if(username === password){
        done(null, {id: username, name:username});
    } else{
        done(null, null);//second param is user object.
    }
}));

/* GET home page. */
router.get("/", function(req, res){
    res.render("auth",{
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
});
router.get("/login", function(req, res){
    res.render("login");
});
router.post("/login", passport.authenticate("local"), function(req, res){
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.render("index",{
        user: req.user
    });
});

module.exports = router;

const express = require('express');
const router = express.Router();

const User = require('../models/User.model');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

//Google Signup
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login",
    failureRedirect: "/" // here you would redirect to the login page using traditional login approach
  })
);

//Google Login



//Facebook Signup
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));



router.post('/signup', (req, res, next) => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
  
    let user = new User({ username: req.body.username, password: hashPass })
    user.save().then(() => {
      res.redirect('/login')
    })

});

router.get('/willkommen', (req,res) => {
    res.render('auth/personalized-page', { user: req.user });
    })  
    


router.get('/login', (req, res, next) => {
  res.render('auth/login');
  
});


router.post('/login', passport.authenticate('local', {
    successRedirect: '/willkommen', // pick up the redirectBackTo parameter and after login redirect the user there. ( default / )
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  }))



module.exports = router;

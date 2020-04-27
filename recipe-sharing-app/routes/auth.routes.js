const express = require('express');
const router = express.Router();

const User = require('../models/User.model');

const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');


router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(req.body.password, salt);
  
    let user = new User({ username: req.body.username, password: hashPass })
    user.save().then(() => {
      res.redirect('/login')
    })

});

router.get('/personalized-page', (req,res) => {
    res.render('auth/personalized-page', { user: req.user });
    })  
    


router.get('/login', (req, res, next) => {
  res.render('auth/login');
  
});


router.post('/login', passport.authenticate('local', {
    successRedirect: '/personalized-page', // pick up the redirectBackTo parameter and after login redirect the user there. ( default / )
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
  }))



module.exports = router;

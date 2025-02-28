const express = require('express');
const Pin = require('../models/pin.model');
const router = express.Router();


router.get('/' , function(req , res){

    res.render("index");

});

router.get('/loginPage' , function(req , res){

    res.render("loginPage");
})

router.get('/signupPage' , function(req , res){

    res.render("signupPage");
})

router.get('/explore',  async function(req , res){

    let pins = await Pin.find().populate('owner').populate('likes');
    res.render("explore" , {
        pins
    });
})



module.exports = router;
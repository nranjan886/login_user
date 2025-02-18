const express = require('express')

const router = express.Router();

router.get('/signup', (req,res)=>{
    res.render('signup')
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/home', (req,res)=>{
    res.render('home')
})

router.get('/password_reset', (req,res)=>{
    res.render('passwordReset')
})

module.exports = router;
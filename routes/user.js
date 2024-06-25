const express = require('express');
const { handleUserSignUp, handleUserLogin, handlepasswordReset } = require('../controller/user')
const router = express.Router();


router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/password_reset", handlepasswordReset);

module.exports = router;

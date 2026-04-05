const express = require('express');
const router = express.Router();

const {loginAdmin} = require('../controller/authController.js');

router.post('/login',loginAdmin);

module.exports = router;
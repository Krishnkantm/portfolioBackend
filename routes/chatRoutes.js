const express = require("express");

const router = express.Router();

const {
  chatWithPortfolio,
} = require("../controller/chatController.js");

router.post("/", chatWithPortfolio);

module.exports = router;
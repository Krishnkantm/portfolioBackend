const express = require('express');
const router = express.Router();

const { getStorage } = require('../controller/storageController.js');
const protect = require('../middleware/authMiddleware.js');

router.get('/', protect, getStorage);

module.exports = router;
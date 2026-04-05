const express = require('express');
const router = express.Router();

const { getProfile, updateProfile } = require('../controller/profileController.js');
const protect = require('../middleware/authMiddleware.js');
const upload = require('../middleware/upload.js');

router.get('/', getProfile);
router.put('/', protect, upload.single('image'), updateProfile);

module.exports = router;
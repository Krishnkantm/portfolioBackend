const express = require('express');
const router = express.Router();

const {saveContact,getContacts,deleteContact} = require('../controller/contactController.js');
const protect = require('../middleware/authMiddleware.js');

router.post('/',protect,saveContact);
router.get('/',getContacts);
router.delete('/:id',protect,deleteContact);

module.exports = router;
const express = require('express');
const router = express.Router();

const {addSkill,getSkills,deleteSkill} = require('../controller/skillController.js');
const protect = require('../middleware/authMiddleware.js');
const upload = require('../middleware/upload.js');

router.get('/',getSkills);
router.post('/',protect,upload.single('file'),addSkill);
router.delete('/:id',protect,deleteSkill);

module.exports = router;

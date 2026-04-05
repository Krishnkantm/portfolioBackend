const express = require('express');
const router = express.Router();

const {addProject,getProjects,deleteProject} = require('../controller/projectController.js');
const upload = require('../middleware/upload.js');
const protect = require('../middleware/authMiddleware.js');

router.post('/',protect,upload.single('file'),addProject);
router.get('/',getProjects);
router.delete('/:id',protect,deleteProject);

module.exports = router;
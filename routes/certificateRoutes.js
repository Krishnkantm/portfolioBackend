const express = require('express');
const router = express.Router();

const {createCertificate,getCertificates,deleteCertificate} = require('../controller/certificateController.js');

const upload = require('../middleware/upload.js');
const protect = require('../middleware/authMiddleware.js');

router.post('/create',protect,upload.single('file'),createCertificate);
router.get('/',getCertificates);
router.delete('/:id',protect,deleteCertificate);

module.exports = router;
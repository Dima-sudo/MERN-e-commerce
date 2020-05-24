const express = require('express');
const router = express.Router();

const miscController = require('../Controllers/miscController');

router.post('/contact', miscController.contact);


module.exports = router;
const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');

const { indexController } = require('../controller/')

router.get('/', indexController);

const authRoute = 
router.use('/auth', )

module.exports = router;

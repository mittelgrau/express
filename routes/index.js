const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');

const { indexController } = require('../controller/')

router.get('/', indexController);

const authRoutes = require('./authentication.js')
router.use('/auth', authRoutes);

module.exports = router;

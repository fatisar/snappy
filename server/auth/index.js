'use strict';

var express = require('express');
var passport = require('passport');
var config = require('../config/environment');
var Host = require('../api/host/host.model');

// Passport Configuration
require('./local/passport').setup(Host, config);
require('./facebook/passport').setup(Host, config);
require('./google/passport').setup(Host, config);

var router = express.Router();

router.use('/local', require('./local'));
router.use('/facebook', require('./facebook'));
router.use('/google', require('./google'));

module.exports = router;

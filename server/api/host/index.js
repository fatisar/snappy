'use strict';

var express = require('express');
var controller = require('./host.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.post('/', controller.create);

module.exports = router;

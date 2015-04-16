'use strict';

var Host = require('./host.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var winston = require('winston');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of hosts
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Host.find({}, '-salt -hashedPassword', function (err, hosts) {
    if(err) return res.send(500, err);
    res.json(200, hosts);
  });
};

/**
 * Creates a new host
 */
exports.create = function (req, res, next) {
  var newHost = new Host(req.body);
  newHost.save(function(err, host) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: host._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single host
 */
exports.show = function (req, res, next) {
  var hostId = req.params.id;

  Host.findById(hostId, function (err, host) {
    if (err) return next(err);
    if (!host) return res.send(401);
    res.json(host.profile);
  });
};

/**
 * Deletes a host
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Host.findByIdAndRemove(req.params.id, function(err, host) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a hosts password
 */
exports.changePassword = function(req, res, next) {
  var hostId = req.host._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  Host.findById(hostId, function (err, host) {
    if(host.authenticate(oldPass)) {
      host.password = newPass;
      host.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var hostId = req.host._id;
  Host.findOne({
    _id: hostId
  }, '-salt -hashedPassword', function(err, host) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!host) return res.json(401);
    res.json(host);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

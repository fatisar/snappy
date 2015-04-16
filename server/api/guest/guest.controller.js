'use strict';

var Guest = require('./guest.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of guests
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Guest.find({}, '-salt -hashedPassword', function (err, guests) {
    if(err) return res.send(500, err);
    res.json(200, guests);
  });
};

/**
 * Creates a new guest
 */
exports.create = function (req, res, next) {
  var newGuest = new Guest(req.body);
  newGuest.provider = 'local';
  newGuest.role = 'guest';
  newGuest.save(function(err, guest) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: guest._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single guest
 */
exports.show = function (req, res, next) {
  var guestId = req.params.id;

  Guest.findById(guestId, function (err, guest) {
    if (err) return next(err);
    if (!guest) return res.send(401);
    res.json(guest.profile);
  });
};

/**
 * Deletes a guest
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Guest.findByIdAndRemove(req.params.id, function(err, guest) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a guests password
 */
exports.changePassword = function(req, res, next) {
  var guestId = req.guest._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  Guest.findById(guestId, function (err, guest) {
    if(guest.authenticate(oldPass)) {
      guest.password = newPass;
      guest.save(function(err) {
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
  var guestId = req.guest._id;
  Guest.findOne({
    _id: guestId
  }, '-salt -hashedPassword', function(err, guest) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!guest) return res.json(401);
    res.json(guest);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

'use strict';

var Invitation = require('./invitation.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of invitations
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Invitation.find({}, function (err, events) {
    if(err) return res.send(500, err);
    res.json(200, events);
  });
};

/**
 * Creates a new invitation
 */
exports.create = function (req, res, next) {
  var newInvitation = new Invitation(req.body);
  newInvitation.save(function(err, event) {
    if (err) return validationError(res, err);
    res.json({ invitation: invitation });
  });
};

/**
 * Get a single invitation
 */
exports.show = function (req, res, next) {
  var invitationId = req.params.id;

  Invitation.findById(invitationId, function (err, invitation) {
    if (err) return next(err);
    if (!event) return res.send(401);
    res.json(invitation);
  });
};

/**
 * Deletes an invitation
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Invitation.findByIdAndRemove(req.params.id, function(err, invitation) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

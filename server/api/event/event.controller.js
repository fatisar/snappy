'use strict';

var Event = require('./event.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of events
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  Event.find({}, function (err, events) {
    if(err) return res.send(500, err);
    res.json(200, events);
  });
};

/**
 * Creates a new event
 */
exports.create = function (req, res, next) {
  var newEvent = new Event(req.body);
  newEvent.save(function(err, event) {
    if (err) return validationError(res, err);
    res.json({ event: event });
  });
};

/**
 * Get a single event
 */
exports.show = function (req, res, next) {
  var eventId = req.params.id;

  Event.findById(eventId, function (err, event) {
    if (err) return next(err);
    if (!event) return res.send(401);
    res.json(event);
  });
};

/**
 * Deletes an event
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Event.findByIdAndRemove(req.params.id, function(err, event) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

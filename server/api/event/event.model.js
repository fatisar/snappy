'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var EventSchema = new Schema({
  name: String,
  address: String,
  startTime: Date
});

/**
 * Virtuals
 */


/**
 * Validations
 */


/**
 * Methods
 */
EventSchema.methods = {

};

module.exports = mongoose.model('Event', EventSchema);

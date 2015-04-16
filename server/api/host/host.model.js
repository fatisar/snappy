'use strict';

var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');

var Schema = mongoose.Schema;
var User = require('../user/user.model');

var HostSchema = User.schema.extend({
  role: { type: String, default: 'host' }
});

module.exports = mongoose.model('Host', HostSchema);

'use strict';

var mongoose = require('mongoose');
var extend = require('mongoose-schema-extend');
var User = require('../user/user.model');

var GuestSchema = User.schema.extend({
  role: { type: String, default: 'guest' }
});

module.exports = mongoose.model('Guest', GuestSchema);

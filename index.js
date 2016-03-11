/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-hubspot-form',

  contentFor: function(type /*, config*/) {
    if (type === 'body') {
      return '<script src="//js.hsforms.net/forms/v2.js"></script>\n';
    }
  }
};

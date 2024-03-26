'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    'ember-truth-helpers': {
      only: ['or'],
    },
  });

  return app.toTree();
};

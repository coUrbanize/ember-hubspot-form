import { isPresent, isHidden } from 'ember-cli-page-object';

export default {
  scope: '#hubspot-form-target',
  targetNode: {
    resetScope: true,
    isHidden: isHidden('#hubspot-form-target'),
    isPresent: isPresent('#hubspot-form-target'),
  },
};

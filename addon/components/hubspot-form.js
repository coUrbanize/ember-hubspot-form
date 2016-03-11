/* global hbspt */
import Ember from 'ember';
import layout from '../templates/components/hubspot-form';

const {
  get,
  isPresent,
  computed,
} = Ember;

const { warn } = Ember.Logger;

export default Ember.Component.extend({

  layout,

  hasValidFormConfig: computed('portalId', 'formId', {
    get() {
      return (isPresent(get(this, 'portalId')) && isPresent(get(this, 'formId')));
    }
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    if (!get(this, 'hasValidFormConfig')) {
      warn('Ember Hubspot Form could not be inserted: it requires a valid `portalId` and `formId`. ');
    }
  },

  didInsertElement() {
    this._super(...arguments);

    // DOM selector to insert form into
    const target = get(this, 'target') || `#${get(this, 'elementId')}`;

    if (get(this, 'hasValidFormConfig')) {

      hbspt.forms.create({
        portalId: get(this, 'portalId'),
        formId: get(this, 'formId'),
        target: target,
      });

    }
  }
});

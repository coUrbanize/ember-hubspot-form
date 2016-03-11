import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hubspot-form', 'Integration | Component | hubspot form', {
  integration: true,

  beforeEach(assert) {

    const component = this;

    // Hubspot library stub
    window.hbspt = {
      forms: {
        create(options) {

          assert.ok(options, 'Has Hubspot Form options');
          assert.equal(typeof options.portalId, 'string');
          assert.ok(options.portalId);

          assert.equal(typeof options.formId, 'string');
          assert.ok(options.formId);

          if (options.target) {
            component.$().find(options.target).append('<form class="hbspt" />');
          }
          else {
            component.$().append('<form class="hbspt" />');
          }

        }
      }
    };
  },

  afterEach() {
    // remove Hubspot library stub
    delete window.hbspt;
  }

});

test('it does not insert invalid from', function(assert) {
  this.render(hbs`{{hubspot-form}}`);
  assert.equal(this.$().find('form.hbspt').length, 0);
});

test('it inserts Hubspot form in component element', function(assert) {
  this.render(hbs`{{hubspot-form portalId='1234' formId='5678'}}`);
  assert.equal(this.$().find('form.hbspt').length, 1);
});

test('it inserts Hubspot form in given target selector', function(assert) {
  this.render(hbs`
    {{#hubspot-form portalId='1234' formId='5678' target='#form-container'}}
      <div id="form-container"></div>
    {{/hubspot-form}}
  `);
  assert.equal(this.$().find('#form-container form.hbspt').length, 1);
});

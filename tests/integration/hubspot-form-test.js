import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { render, click, fillIn } from '@ember/test-helpers';
import hubspotFormComponent from '../helpers/page/components/hubspot-form';
import { create } from 'ember-cli-page-object';
import createHubspotForm from '../helpers/create-hubspot-form';
import setupHubspotForm from '../helpers/setup-hubspot-form';

const hubspotForm = create(hubspotFormComponent);

module('Integration | Component | HubspotForm', function (hooks) {
  setupRenderingTest(hooks);
  setupHubspotForm(hooks);

  test('yields content with provided API for Hubspot form', async function (assert) {
    await renderComponent();
    assert.true(hubspotForm.targetNode.isPresent);
    assert.true(hubspotForm.targetNode.isHidden);
    assert.dom('.success').doesNotExist();
    assert.dom('.yield-form').exists({ count: 1 });
    assert.dom('.is-form-ready').hasText('false');
    assert.dom('.is-input-disabled').hasText('true');
    assert.dom('.error').hasNoText();
    assert.dom('.checkbox').exists({ count: 1 });
    assert.dom('.email-input').exists({ count: 1 });
    assert.dom('.submit-button').exists({ count: 1 });
    await createHubspotForm.call(this);
    assert.dom('.success').doesNotExist();
    assert.dom('.yield-form').exists({ count: 1 });
    assert.dom('.is-form-ready').hasText('true');
    assert.dom('.is-input-disabled').hasText('true');
    assert.dom('.error').hasNoText();
    assert.dom('.checkbox').exists({ count: 1 });
    assert.dom('.email-input').exists({ count: 1 });
    assert.dom('.submit-button').exists({ count: 1 });
    await click('.checkbox');
    assert.dom('.is-input-disabled').hasText('false');
    await click('.submit-button');
    assert.dom('.error').hasText('Please complete this required field.');
    assert.dom('.hs-error-msg').hasText('Please complete this required field.');
    assert.dom('.hs-error-msg').exists({ count: 1 });
    assert.dom('.hs-error-msg').isNotVisible();
    await fillIn('.email-input', '');
    assert.dom('.hs-error-msg').doesNotExist();
    await click('.submit-button');
    assert.dom('.error').hasText('Please complete this required field.');
    assert.dom('.hs-error-msg').hasText('Please complete this required field.');
    assert.dom('.hs-error-msg').exists({ count: 1 });
    assert.dom('.hs-error-msg').isNotVisible();
    await fillIn('.email-input', 'example');
    assert.dom('.hs-error-msg').doesNotExist();
    await click('.submit-button');
    assert.dom('.error').hasText('Email must be formatted correctly.');
    assert.dom('.hs-error-msg').hasText('Email must be formatted correctly.');
    assert.dom('.hs-error-msg').exists({ count: 1 });
    assert.dom('.hs-error-msg').isNotVisible();
    await fillIn('.email-input', 'example@mail.eu');
    assert.dom('.hs-error-msg').doesNotExist();
    await click('.submit-button');
    assert.dom('.error').hasText('Please enter a valid email address.');
    assert.dom('.hs-error-msg').hasText('Please enter a valid email address.');
    assert.dom('.hs-error-msg').exists({ count: 1 });
    assert.dom('.hs-error-msg').isNotVisible();
    await fillIn('.email-input', 'example@mail.com');
    assert.dom('.hs-error-msg').doesNotExist();
    await click('.submit-button');
    assert.dom('.hs-error-msg').doesNotExist();
    assert.dom('.yield-form').doesNotExist();
    assert.dom('.success').exists({ count: 1 });
  });

  function renderComponent() {
    return render(hbs`
      <HubspotForm
        as |data|
      >
        {{#if data.isSuccessSubmitted}}
          <data.Success>
            <div class="success"></div>
          </data.Success>
        {{else}}
          <div class="yield-form">
            <div class="is-form-ready">{{data.isFormReady}}</div>
            <div class="is-input-disabled">{{data.isInputDisabled}}</div>
            <div class="error">{{data.error}}</div>
            <button class="checkbox" {{on "click" data.onCheckboxChange}}></button>
            <input class="email-input" {{on "input" data.onInput}}/>
            <button class="submit-button" {{on "click" data.onSubmit}}></button>
          </div>
        {{/if}}
      </HubspotForm>
    `);
  }
});

import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { dropTask, timeout, waitForProperty } from 'ember-concurrency';
import { ref } from 'ember-ref-bucket';
import injectScript from '../utils/inject-script';
import pseudoJquery from '../utils/pseudo-jquery';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default class HubspotFormComponent extends Component {
  @tracked emailInput;
  @tracked error = null;
  @tracked isInputDisabled = true;
  @service hubspotForm;
  @service config;
  @ref('targetNode') targetNode = null;

  get style() {
    return htmlSafe('display: none');
  }

  @dropTask
  *setupForm() {
    if (this.config.get('environment') === 'test') {
      return;
    }

    yield injectScript('//js.hsforms.net/forms/v2.js');
    yield waitForProperty(
      this,
      'targetNode',
      (targetNode) => targetNode !== null
    );
    const { region, portalId, formId } = this.config.get('APP.hubspot');
    // eslint-disable-next-line no-undef
    hbspt.forms.create({
      region,
      portalId,
      formId,
      target: `#${this.targetNode.id}`,
      onBeforeFormInit: pseudoJquery,
      onFormReady: () => {
        set(this, 'hubspotForm.isFormReady', true);
      },
      onFormSubmitted: () => {
        set(this, 'hubspotForm.isSuccessSubmitted', true);
        if (this.args.onFormSubmitted) {
          this.args.onFormSubmitted(this.emailInputValue);
        }
      },
    });
    yield waitForProperty(
      this.hubspotForm,
      'isFormReady',
      (value) => value === true
    );
  }

  @dropTask
  *onInput(event) {
    this.error = null;
    this.emailInputValue = event.target.value;
    const emailInput = document.querySelector('input.hs-input[type="email"]');
    emailInput.value = this.emailInputValue;
    const onInputEvent = new Event('input', {
      bubbles: true,
      cancelable: true,
    });
    emailInput.dispatchEvent(onInputEvent);
    yield timeout(this.config.get('environment') === 'test' ? 0 : 200);
  }

  @dropTask
  *onSubmit() {
    document.querySelector('input.hs-button[type="submit"]').click();
    yield timeout(this.config.get('environment') === 'test' ? 0 : 300);
    if (document.querySelector('.hs-error-msg')) {
      this.error = document.querySelector('.hs-error-msg').textContent;
    }
  }

  @dropTask
  *onCheckboxChange() {
    document.querySelector('input.hs-input[type="checkbox"]').click();
    yield timeout(this.config.get('environment') === 'test' ? 0 : 100);
    this.isInputDisabled = !this.isInputDisabled;
  }
}

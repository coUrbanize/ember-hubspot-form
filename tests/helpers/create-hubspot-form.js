import { Promise } from 'rsvp';
import { find } from '@ember/test-helpers';
import { settled } from '@ember/test-helpers';
import { assert } from '@ember/debug';

export default async function createHubspotForm(validEmail = 'example@mail.com') {
  await new Promise((resolve) => {
    const targetNode = find('#hubspot-form-target');
    const form = document.createElement('form');
    targetNode.appendChild(form);
    this.hubspotForm.set('isFormReady', true);
    const checkboxInput = document.createElement('input');
    checkboxInput.classList.add('hs-input');
    checkboxInput.setAttribute('type', 'checkbox');
    form.appendChild(checkboxInput);
    const emailInput = document.createElement('input');
    emailInput.classList.add('hs-input');
    emailInput.setAttribute('type', 'email');
    emailInput.addEventListener('input', () => {
      if (document.querySelector('.hs-error-msg')) {
        document.querySelector('.hs-error-msg').remove();
      }
    });
    form.appendChild(emailInput);
    const submitInput = document.createElement('input');
    submitInput.classList.add('hs-button');
    submitInput.setAttribute('type', 'submit');
    submitInput.addEventListener('click', (event) => {
      event.preventDefault();
      const { value } = emailInput;
      if (!value) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('hs-error-msg');
        errorDiv.textContent = 'Please complete this required field.';
        form.appendChild(errorDiv);
      } else if (!value.match(/@/)) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('hs-error-msg');
        errorDiv.textContent = 'Email must be formatted correctly.';
        form.appendChild(errorDiv);
      } else if (value !== validEmail) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('hs-error-msg');
        errorDiv.textContent = 'Please enter a valid email address.';
        form.appendChild(errorDiv);
      } else {
        this.hubspotForm.set('isSuccessSubmitted', true);
      }
    });
    form.appendChild(submitInput);
    resolve();
  });
  assert('Hubspot fake form created', true);
  await settled();
}

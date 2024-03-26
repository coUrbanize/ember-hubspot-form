import Service from '@ember/service';

export default function setupHubspotForm(hooks) {
  hooks.beforeEach(function () {
    let dependencyInjectionName = 'service:hubspot-form';
    this.owner.register(dependencyInjectionName, Service);
    this.hubspotForm = this.owner.lookup(dependencyInjectionName);
    this.hubspotForm.isFormReady = false;
    this.hubspotForm.isSuccessSubmitted = false;
  });

  hooks.afterEach(function () {
    this.hubspotForm.set('isFormReady', false);
    this.hubspotForm.set('isSuccessSubmitted', false);
  });
}

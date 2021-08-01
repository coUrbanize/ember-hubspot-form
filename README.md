# ember-hubspot-form

[![Build Status](https://travis-ci.org/coUrbanize/ember-hubspot-form.svg?branch=master)](https://travis-ci.org/coUrbanize/ember-hubspot-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-hubspot-form.svg)](http://emberobserver.com/addons/ember-hubspot-form)

A thin wrapper around [Hubspot Forms](http://developers.hubspot.com/docs/methods/forms/forms_overview) to make integration in Ember Apps easier.

## Installation

Install this addon with Ember CLI:

    ember install ember-hubspot-form

## Configuration

`config/environment.js`

```js
const ENV = {
    // ...

    APP: {
      hubspot: {
        region: 'na1',
        portalId: '000000',
        formId: '00000000-0000-0000-0000-00000000000',
      },
      // ...
    },
  };
```

## Usage

Add the component to one of your templates:

```handlebars
<HubspotForm
  @onFormSubmitted={{noop}}
  as |hubspotForm|
>
  <hubspotForm.Content as |data|>
    <button type="button" class="checkbox" {{on "click" data.onCheckboxChange}} disabled={{not data.isFormReady}}>checkbox</button>
    <input class="email-input" {{on "input" data.onInput}} disabled={{data.isInputDisabled}}/>
    <button type="button" class="submit-button" {{on "click" data.onSubmit}} disabled={{data.isInputDisabled}}>submit-button</button>
    {{#if data.error}}
      <div class="error">error:{{data.error}}</div>
    {{/if}}
  </hubspotForm.Content>
  <hubspotForm.Success>
    <div class="success">success</div>
  </hubspotForm.Success>
</HubspotForm>
```

Please see the [Hubspot Form documentation](http://developers.hubspot.com/docs/methods/forms/advanced_form_options) for all details. Currently the addon supports following configuration options:

### Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### License

This project is licensed under the [MIT License](LICENSE.md).

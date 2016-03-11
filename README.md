# ember-hubspot-form

[![Build Status](https://travis-ci.org/coUrbanize/ember-hubspot-form.svg?branch=master)](https://travis-ci.org/coUrbanize/ember-hubspot-form)

A thin wrapper around [Hubspot Forms](http://developers.hubspot.com/docs/methods/forms/forms_overview) to make integration in Ember Apps easier.

## Installation

Install this addon with ember-cli:

    ember install ember-hubspot-form

## Usage and Configuration

Add the component to one of your templates:

    {{hubspot-form
      portalId='MY_PORTAL_ID'
      formId='MY_FORM_ID'
    }}

Please see the [Hubspot Form documentation](http://developers.hubspot.com/docs/methods/forms/advanced_form_options) for all details. Currently the addon supports following configuration options:

* `portalId` (required)
* `formId` (required)
* `target`: DOM selector string to insert the form into

## Collaboration

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

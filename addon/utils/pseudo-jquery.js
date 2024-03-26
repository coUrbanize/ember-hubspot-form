// https://www.unstack.com/blog/hubspot-on-form-submit-callbacks-without-jquery
// to keep "jquery-integration": false in config/optional-features.json

export default function pseudoJquery() {
  return (function () {
    window.jQuery =
      window.jQuery ||
      function (nodeOrSelector) {
        if (typeof nodeOrSelector === 'string') {
          return document.querySelector(nodeOrSelector);
        }
        return nodeOrSelector;
      };
  })();
}

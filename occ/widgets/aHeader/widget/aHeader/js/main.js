define([
  "knockout",
  "jquery",
  "pubsub",
  "notifier",
  "ccConstants",
  "ccRestClient",
  "pageLayout/product",
  "ccStoreConfiguration"
], function(
  ko,
  $,
  pubsub,
  notifier,
  CCConstants,
  CCRestClient,
  Product,
  CCStoreConfiguration
) {
  var moduleObj = {
    onLoad: function(widget) {
      // console.log('a widget', widget);
    }
  };

  return moduleObj;
});

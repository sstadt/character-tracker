/*jslint browser: true*/
/*globals requirejs, alert, confirm, io*/

requirejs.config({
  paths: {
    // plugins
    'text': 'plugins/text',

    // vendor
    'jquery': 'vendor/jquery-2.1.1',
    'lodash': 'vendor/lodash.compat',
    'bootstrap': 'vendor/bootstrap',
    'knockout': 'vendor/knockout-3.2.0',
    'sails': 'vendor/sails.io',
    'react': 'vendor/react.js',
    'jsx': 'vendor/JSXTransformer.js',

    // classes
    'Character': 'lib/classes/Character',
    'CharacterClass': 'lib/classes/CharacterClass',

    // util
    'statistics': 'lib/statistics'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    },
    'react': {
      deps: ['jsx']
    }
  },
  deps: [
    'knockout', 'jquery', 'sails', 'bootstrap'
  ],
  callback: function (ko, $) {

    /* Custom Data Bindings
    ------------------------------*/

    /**
     * Custom binding for elements which contain the
     * contenteditable="true" attribute. Gives them
     * identical behavior to an input element with
     * the value binding.
     */
    ko.bindingHandlers.editableText = {
      init: function (element, valueAccessor) {
        $(element).on('blur', function () {
          var observable = valueAccessor();
          observable($(this).text());
        });
      },
      update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).text(value);
      }
    };

    /**
     * Custom binding for jquery slide down
     * animation on element creation
     */
    ko.bindingHandlers.slideDown = {
      init: function (element) {
        if (element.nodeType === 1) {
          $(element).hide().slideDown();
        }
      }
    };
  }
});




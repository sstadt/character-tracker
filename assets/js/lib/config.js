/*jslint browser: true*/
/*globals requirejs, alert, confirm, io*/

requirejs.config({
  urlArgs: 'v=' + (new Date()).getTime(),
  paths: {
    // plugins
    'text'           : 'plugins/text',

    // vendor
    'sails'          : 'vendor/sails.io.js/sails.io',
    'jquery'         : 'vendor/jquery/dist/jquery',
    'lodash'         : 'vendor/lodash/lodash',
    'bootstrap'      : 'vendor/bootstrap/dist/js/bootstrap',
    'knockout'       : 'vendor/knockout/dist/knockout',

    // classes
    'Character'      : 'lib/classes/Character',
    'CharacterClass' : 'lib/classes/CharacterClass',

    // util
    'statistics'     : 'lib/utils/statistics',

    // testing
    'mocha'          : 'vendor/mocha/mocha',
    'chai'           : 'vendor/chai/chai',
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    },
    'mocha': {
      init: function () {
        this.mocha.setup('bdd');
        return this.mocha;
      }
    }
  },
  deps: [
    'knockout', 'jquery', 'bootstrap'
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




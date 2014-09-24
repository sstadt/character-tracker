/*jslint browser: true*/
/*globals requirejs, alert, confirm, io*/

requirejs.config({
  deps: [
    'sails', 'bootstrap'
  ],
  paths: {
    // plugins
    'text': 'plugins/text',
    // vendor
    'jquery': 'vendor/jquery-2.1.1',
    'lodash': 'vendor/lodash.compat',
    'bootstrap': 'vendor/bootstrap',
    'knockout': 'vendor/knockout-3.2.0',
    'sails': 'vendor/sails.io',
    // classes
    'Character': 'lib/classes/Character',
    'CharacterClass': 'lib/classes/CharacterClass',
    // util
    'statistics': 'lib/statistics'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});
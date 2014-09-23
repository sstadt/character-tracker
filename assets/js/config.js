/*jslint browser: true*/
/*globals requirejs, alert, confirm, io*/

requirejs.config({
  deps: [
    // vendor
    'sails', 'bootstrap',
    // classes
    'Character', 'CharacterClass'
  ],
  paths: {
    // plugins
    'text': 'plugins/text',
    // vendor
    'jquery': 'dependencies/jquery-2.1.1',
    'lodash': 'dependencies/lodash.compat',
    'bootstrap': 'dependencies/bootstrap',
    'knockout': 'dependencies/knockout-3.2.0',
    'sails': 'dependencies/sails.io'
    // classes
    'Character': 'classes/Character',
    'CharacterClass': 'classes/CharacterClass'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});
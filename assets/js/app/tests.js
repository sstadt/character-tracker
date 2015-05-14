/*jslint browser: true*/
/*globals describe, it*/

require([
  'mocha',
  'tests/classes',
  'tests/utils',
], function (mocha, classTests, utilTests) {
  'use strict';

  describe('Utilities', utilTests);
  describe('Classes', classTests);

  mocha.run();
});
/*jslint browser: true*/
/*globals describe, it*/

require([
  'mocha',
  'tests/classes/character'
], function (mocha, characterTests) {
  'use strict';

  describe('Classes', function () {
    describe('Character', characterTests);
  });

  mocha.run();
});
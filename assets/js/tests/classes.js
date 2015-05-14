/*jslint browser: true*/
/*globals define, describe, it*/

define([
  'tests/classes/character',
  'tests/classes/character-class',
  'mocha',
], function (characterTests, characterClassTests) {
  'use strict';

  return function classTests() {
    describe('Character', characterTests);
    describe('CharacterClass', characterClassTests);
  };

});
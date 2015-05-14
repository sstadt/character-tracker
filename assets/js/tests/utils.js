/*jslint browser: true*/
/*globals define, describe, it*/

define([
  'tests/utils/statistics',
  'mocha',
], function (statisticsTests) {
  'use strict';

  return function classTests() {
    describe('Statistics', statisticsTests);
  };

});
/*jslint browser: true*/
/*globals define, describe, it*/

define([
  'chai',
  'statistics',
  'CharacterClass',
  'mocha'
], function (chai, statistics, CharacterClass) {
  'use strict';

  var expect = chai.expect;

  return function statisticsTests() {

    describe('#getDefaultStat', function () {
      it('should return a number', function () {
        expect(statistics.getDefaultStat()).to.be.a('number');
      });
      it('should return a value of 14', function () {
        expect(statistics.getDefaultStat()).to.equal(14);
      });
    });

    describe('#getHealth', function () {
      it('should return a number', function () {
        expect(statistics.getHealth(12)).to.be.a('number');
      });
      it('should deviate from 10 by 1 for every 2 points vitality deviates from 12', function () {
        expect(statistics.getHealth(14)).to.equal(11);
      });
      it('should deviate from 10 by 1 for every 2 points vitality deviates from 12', function () {
        expect(statistics.getHealth(12)).to.equal(10);
      });
      it('should deviate from 10 by 1 for every 2 points vitality deviates from 12', function () {
        expect(statistics.getHealth(1)).to.equal(4);
      });
      it('should deviate from 10 by 1 for every 2 points vitality deviates from 12', function () {
        expect(statistics.getHealth(18)).to.equal(13);
      });
    });

    describe('#getClassBonus', function () {
      it('should return a number', function () {
        var testClass = new CharacterClass({ primary: 'strength', secondary: 'dexterity', tertiary: 'smarts' }),
          testBonuses = { primary: 6, secondary: 3, tertiary: -2 };

        expect(statistics.getClassBonus('strength', testClass, testBonuses)).to.be.a('number');
      });
      it('should return 0 if there is no corresponding statistic found', function () {
        var testClass = new CharacterClass({ primary: 'strength', secondary: 'dexterity', tertiary: 'smarts' }),
          testBonuses = { primary: 6, secondary: 3, tertiary: -2 };

        expect(statistics.getClassBonus('agility', testClass, testBonuses)).to.equal(0);
      });
      it('should return the corresponding statistic bonus', function () {
        var testClass = new CharacterClass({ primary: 'strength', secondary: 'dexterity', tertiary: 'smarts' }),
          testBonuses = { primary: 6, secondary: 3, tertiary: -2 };

        expect(statistics.getClassBonus('strength', testClass, testBonuses)).to.equal(6);
      });
      it('should return the corresponding statistic bonus', function () {
        var testClass = new CharacterClass({ primary: 'strength', secondary: 'dexterity', tertiary: 'smarts' }),
          testBonuses = { primary: 6, secondary: 3, tertiary: -2 };

        expect(statistics.getClassBonus('dexterity', testClass, testBonuses)).to.equal(3);
      });
      it('should return the corresponding statistic bonus', function () {
        var testClass = new CharacterClass({ primary: 'strength', secondary: 'dexterity', tertiary: 'smarts' }),
          testBonuses = { primary: 6, secondary: 3, tertiary: -2 };

        expect(statistics.getClassBonus('smarts', testClass, testBonuses)).to.equal(-2);
      });
    });
  };

});
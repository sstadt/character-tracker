/*jslint browser: true*/
/*globals define, describe, it*/

define(['chai', 'CharacterClass', 'mocha'], function (chai, CharacterClass) {
  'use strict';

  var expect = chai.expect;

  return function characterTests() {

    describe('Name', function () {
      it('should set a value if provided', function () {
        var c = new CharacterClass({ name: 'Fighter' });
        expect(c.name).to.equal('Fighter');
      });
      it('should be undefined if not set', function () {
        var c = new CharacterClass();
        expect(c.name).to.be.an('undefined');
      });
    });

    describe('Primary', function () {
      it('should set a value if provided', function () {
        var c = new CharacterClass({ primary: 'intellect' });
        expect(c.primary).to.equal('intellect');
      });
      it('should be undefined if not set', function () {
        var c = new CharacterClass();
        expect(c.primary).to.be.an('undefined');
      });
    });

    describe('Secondary', function () {
      it('should set a value if provided', function () {
        var c = new CharacterClass({ secondary: 'dexterity' });
        expect(c.secondary).to.equal('dexterity');
      });
      it('should be undefined if not set', function () {
        var c = new CharacterClass();
        expect(c.secondary).to.be.an('undefined');
      });
    });

    describe('Tertiary', function () {
      it('should set a value if provided', function () {
        var c = new CharacterClass({ tertiary: 'strength' });
        expect(c.tertiary).to.equal('strength');
      });
      it('should be undefined if not set', function () {
        var c = new CharacterClass();
        expect(c.tertiary).to.be.an('undefined');
      });
    });

  };

});
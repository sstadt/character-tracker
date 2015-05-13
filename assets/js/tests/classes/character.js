/*jslint browser: true*/
/*globals define, describe, it*/

define(['mocha', 'chai', 'Character', 'statistics'], function (mocha, chai, Character, statistics) {
  'use strict';

  var expect = chai.expect,
    defaultStat = statistics.getDefaultStat();

  return function characterTests() {

    describe('ID', function () {
      it('should not be a function', function () {
        var c = new Character();
        expect(c.id).to.not.be.a('function');
      });
      it('should be undefined if not set', function () {
        var c = new Character();
        expect(c.id).to.be.an('undefined');
      });
      it('should set an ID if one is passed in', function () {
        var c = new Character({ id: 1 });
        expect(c.id).to.equal(1);
      });
    });

    describe('Name', function () {
      it('should be a function', function () {
        var c = new Character();
        expect(c.name).to.be.a('function');
      });
      it('should set a default name as an empty string', function () {
        var c = new Character();
        expect(c.name()).to.equal('');
      });
      it('should set a name if one is passed in', function () {
        var c = new Character({ name: 'Bob' });
        expect(c.name()).to.equal('Bob');
      });
    });

    describe('Biography', function () {
      it('should be a function', function () {
        var c = new Character();
        expect(c.bio).to.be.a('function');
      });
      it('should set a default biography as an empty string', function () {
        var c = new Character();
        expect(c.bio()).to.equal('');
      });
      it('should set a biography if one is passed in', function () {
        var c = new Character({ bio: 'A long time ago, in a galaxy far, far away...' });
        expect(c.bio()).to.equal('A long time ago, in a galaxy far, far away...');
      });
    });

    describe('Character Class', function () {
      it('should not be a function', function () {
        var c = new Character();
        expect(c.charClass).to.not.be.a('function');
      });
      it('should set a default name as an empty string', function () {
        var c = new Character();
        expect(c.charClass).to.equal('');
      });
      it('should set a character class if one is passed in', function () {
        var c = new Character({ charClass: 'Fighter' });
        expect(c.charClass).to.equal('Fighter');
      });
    });

    describe('Strength', function () {
      it('should be a function', function () {
        var c = new Character();
        expect(c.strength).to.be.a('function');
      });
      it('should set a default strength as the default value in the statistics utility', function () {
        var c = new Character();
        expect(c.strength()).to.equal(defaultStat);
      });
      it('should set a strength if one is passed in', function () {
        var c = new Character({ strength: 10 });
        expect(c.strength()).to.equal(10);
      });
    });

    describe('Dexterity', function () {
      it('should be a function', function () {
        var c = new Character();
        expect(c.dexterity).to.be.a('function');
      });
      it('should set a default dexterity as the default value in the statistics utility', function () {
        var c = new Character();
        expect(c.dexterity()).to.equal(defaultStat);
      });
      it('should set a dexterity if one is passed in', function () {
        var c = new Character({ dexterity: 10 });
        expect(c.dexterity()).to.equal(10);
      });
    });

    describe('Intellect', function () {
      it('should be a function', function () {
        var c = new Character();
        expect(c.intellect).to.be.a('function');
      });
      it('should set a default intellect as the default value in the statistics utility', function () {
        var c = new Character();
        expect(c.intellect()).to.equal(defaultStat);
      });
      it('should set a intellect if one is passed in', function () {
        var c = new Character({ intellect: 10 });
        expect(c.intellect()).to.equal(10);
      });
    });

    describe('Vitality', function () {
      it('should be a function', function () {
        var c = new Character();
        expect(c.vitality).to.be.a('function');
      });
      it('should set a default vitality as the default value in the statistics utility', function () {
        var c = new Character();
        expect(c.vitality()).to.equal(defaultStat);
      });
      it('should set a vitality if one is passed in', function () {
        var c = new Character({ vitality: 10 });
        console.log(c);
        expect(c.vitality()).to.equal(10);
      });
    });

    describe('Health', function () {
      it('should be a function', function () {
        var c = new Character();
        expect(c.health).to.be.a('function');
      });
      it('should be set to 10 when vitality is 12', function () {
        var c = new Character({ vitality: 12 });
        expect(c.health()).to.equal(10);
      });
      it('should adjust by 1 for every 2 points vitality deviates from 10', function () {
        var c = new Character({ vitality: 20 });
        expect(c.health()).to.equal(14);
      });
    });

  };

});
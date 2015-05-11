/*jslint browser: true*/
/*globals define*/

/**
 * Class - Character
 * 
 * Contains data associated with a character
 * 
 *   id: database id
 *   name: character name
 *   charClass: character's class
 *   strength: attribute
 *   dexterity: attribute
 *   vitality: attribute
 *   intellect: attribute
 *   bio: short character description
 *   health(computed): adjusted for vitality
 */

define(['knockout', 'statistics'], function (ko, statistics) {
  'use strict';

  return function Character(data) {
    if (data === undefined) {
      data = {};
    }

    this.id = data.id || '';
    this.name = ko.observable(data.name || '');
    this.charClass = data.charClass || '';
    this.strength = ko.observable(data.strength || statistics.getDefaultStat());
    this.dexterity = ko.observable(data.dexterity || statistics.getDefaultStat());
    this.vitality = ko.observable(data.vitality || statistics.getDefaultStat());
    this.intellect = ko.observable(data.intellect || statistics.getDefaultStat());
    this.bio = ko.observable(data.bio || '');

    this.health = ko.computed(function () {
      return statistics.getAdjusted(10, data.vitality);
    });
  };
});
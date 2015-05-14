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

    var self = this;

    if (data === undefined) {
      data = {};
    }

    self.id = data.id || undefined;
    self.name = ko.observable(data.name || '');
    self.charClass = data.charClass || '';
    self.strength = ko.observable(data.strength || statistics.getDefaultStat());
    self.dexterity = ko.observable(data.dexterity || statistics.getDefaultStat());
    self.vitality = ko.observable(data.vitality || statistics.getDefaultStat());
    self.intellect = ko.observable(data.intellect || statistics.getDefaultStat());
    self.bio = ko.observable(data.bio || '');

    self.health = ko.computed(function () {
      return statistics.getHealth(self.vitality());
    });
  };
});
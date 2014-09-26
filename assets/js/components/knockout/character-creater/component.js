/*jslint browser: true*/
/*globals define, alert, confirm*/

/**
 * Character Creater Component
 *
 * Encapculates the character creation component of the
 * character tracker page.
 */

define([
  'jquery',
  'knockout',
  'statistics',
  'Character',
  'CharacterClass',
  'text!./template.html'
], function ($, ko, statistics, Character, CharacterClass, html) {
  'use strict';

  /* View Model
  ------------------------------*/

  function CharacterCreaterViewModel(params) {
    // cache this to prevent potential conflicts
    var self = this;

    // character list - synced to the CharacterListViewModel
    self.characters = params.characterList;

    // class data
    self.classes = ko.observableArray([]);
    self.classOptions = ko.observableArray([]);

    // new character data
    self.newCharacterName = ko.observable();
    self.newCharacterClass = ko.observable();
    self.newCharacterStrength = ko.observable(statistics.defaultStatisticValue);
    self.newCharacterDexterity = ko.observable(statistics.defaultStatisticValue);
    self.newCharacterVitality = ko.observable(statistics.defaultStatisticValue);
    self.newCharacterIntellect = ko.observable(statistics.defaultStatisticValue);
    self.newCharacterBiography = ko.observable();

    // populate class data
    $.ajax({
      type: 'GET',
      url: '/static/classes',
      dataType: 'json',
      cache: false,
      success: function (response) {
        if (response.success) {
          var mappedClasses = $.map(response.classes, function (c) {
            return new CharacterClass(c);
          });

          self.classes(mappedClasses);
          self.classOptions(mappedClasses.map(function (c) {
            return c.name;
          }));

          self.bonuses = response.bonuses;
        } else {
          alert('error getting classes');
          console.log(response);
        }
      }
    });

    // set the character class for a new character
    self.setNewCharacterClass = function () {
      var selectedClass = _.find(self.classes(), function (c) {
          return c.name === self.newCharacterClass();
        });

      self.newCharacterStrength(statistics.getClassBonus('strength', selectedClass, self.bonuses) + statistics.defaultStatisticValue);
      self.newCharacterDexterity(statistics.getClassBonus('dexterity', selectedClass, self.bonuses) + statistics.defaultStatisticValue);
      self.newCharacterVitality(statistics.getClassBonus('vitality', selectedClass, self.bonuses) + statistics.defaultStatisticValue);
      self.newCharacterIntellect(statistics.getClassBonus('intellect', selectedClass, self.bonuses) + statistics.defaultStatisticValue);
    };

    // add a new character
    self.addCharacter = function () {
      var newChar = {
          name: self.newCharacterName(),
          charClass: self.newCharacterClass(),
          strength: self.newCharacterStrength(),
          dexterity: self.newCharacterDexterity(),
          vitality: self.newCharacterVitality(),
          intellect: self.newCharacterIntellect(),
          bio: self.newCharacterBiography()
        };

      $.ajax({
        type: 'POST',
        url: '/character/create',
        dataType: 'json',
        data: newChar,
        cache: false,
        success: function (response) {
          if (response.success) {
            self.characters.push(new Character(response.character));

            self.newCharacterName('');
            self.newCharacterClass('');
            self.newCharacterStrength(statistics.defaultStatisticValue);
            self.newCharacterDexterity(statistics.defaultStatisticValue);
            self.newCharacterVitality(statistics.defaultStatisticValue);
            self.newCharacterIntellect(statistics.defaultStatisticValue);
            self.newCharacterBiography('');
          } else {
            alert('error');
            console.log(response.error);
          }
        }
      });
    };
  }

  /* View Model Methods
  ------------------------------*/

  return {
    viewModel: CharacterCreaterViewModel,
    template: html
  };
});


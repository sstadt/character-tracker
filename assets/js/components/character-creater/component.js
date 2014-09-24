/*jslint browser: true*/
/*globals requirejs, define, alert, confirm, io*/

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
    // character list - synced to the CharacterListViewModel
    this.characters = params.characterList;

    // class data
    this.classes = ko.observableArray([]);
    this.classOptions = ko.observableArray([]);

    // new character data
    this.newCharacterName = ko.observable();
    this.newCharacterClass = ko.observable();
    this.newCharacterStrength = ko.observable(statistics.defaultStatisticValue);
    this.newCharacterDexterity = ko.observable(statistics.defaultStatisticValue);
    this.newCharacterVitality = ko.observable(statistics.defaultStatisticValue);
    this.newCharacterIntellect = ko.observable(statistics.defaultStatisticValue);
    this.newCharacterBiography = ko.observable();

    // populate class data
    $.ajax({
      context: this,
      url: '/static/classes',
      dataType: 'json',
      success: function (response) {
        if (response.success) {
          var mappedClasses = $.map(response.classes, function (c) {
            return new CharacterClass(c);
          });

          this.classes(mappedClasses);
          this.classOptions(mappedClasses.map(function (c) {
            return c.name;
          }));

          this.bonuses = response.bonuses;
        } else {
          alert('error getting classes');
          console.log(response);
        }
      }
    });
  }

  /* View Model Methods
  ------------------------------*/

  // set the character class for a new character
  CharacterCreaterViewModel.prototype.setNewCharacterClass = function () {
    var selectedClass = _.find(this.classes(), function (c) {
        return c.name === this.newCharacterClass();
      }, this);

    this.newCharacterStrength(statistics.getClassBonus('strength', selectedClass, this.bonuses) + statistics.defaultStatisticValue);
    this.newCharacterDexterity(statistics.getClassBonus('dexterity', selectedClass, this.bonuses) + statistics.defaultStatisticValue);
    this.newCharacterVitality(statistics.getClassBonus('vitality', selectedClass, this.bonuses) + statistics.defaultStatisticValue);
    this.newCharacterIntellect(statistics.getClassBonus('intellect', selectedClass, this.bonuses) + statistics.defaultStatisticValue);
  };

  // add a new character
  CharacterCreaterViewModel.prototype.addCharacter = function () {
    var newChar = {
        name: this.newCharacterName(),
        charClass: this.newCharacterClass(),
        strength: this.newCharacterStrength(),
        dexterity: this.newCharacterDexterity(),
        vitality: this.newCharacterVitality(),
        intellect: this.newCharacterIntellect(),
        bio: this.newCharacterBiography()
      };

    $.ajax({
      context: this,
      type: 'POST',
      url: '/character/create',
      dataType: 'json',
      data: newChar,
      cache: false,
      success: function (response) {
        if (response.success) {
          this.characters.push(new Character(response.character));

          this.newCharacterName('');
          this.newCharacterClass('');
          this.newCharacterStrength(statistics.defaultStatisticValue);
          this.newCharacterDexterity(statistics.defaultStatisticValue);
          this.newCharacterVitality(statistics.defaultStatisticValue);
          this.newCharacterIntellect(statistics.defaultStatisticValue);
          this.newCharacterBiography('');
        } else {
          alert('error');
          console.log(response.error);
        }
      }
    });
  };

  return {
    viewModel: CharacterCreaterViewModel,
    template: html
  };
});


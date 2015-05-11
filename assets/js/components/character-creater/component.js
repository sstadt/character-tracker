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

  function CharacterCreaterViewModel(params) {
    // cache this to prevent potential conflicts
    var self = this;

    self.characters = params.characterList;

    // class data
    self.classes = ko.observableArray([]);
    self.classOptions = ko.observableArray([]);

    // new character data
    self.newCharacter = ko.observable(new Character());

    self.setNewCharacterClass = function () {
      // find the selected character class details based on the current data-bind value
      var selectedClass = _.find(self.classes(), function (c) {
          return c.name === self.newCharacter().charClass;
        }),
        newStr = statistics.getClassBonus('strength', selectedClass, self.bonuses) + statistics.getDefaultStat(),
        newDex = statistics.getClassBonus('dexterity', selectedClass, self.bonuses) + statistics.getDefaultStat(),
        newVit = statistics.getClassBonus('vitality', selectedClass, self.bonuses) + statistics.getDefaultStat(),
        newInt = statistics.getClassBonus('intellect', selectedClass, self.bonuses) + statistics.getDefaultStat();

      // update the statistic data bindings based on the selected class
      self.newCharacter().strength(newStr);
      self.newCharacter().dexterity(newDex);
      self.newCharacter().vitality(newVit);
      self.newCharacter().intellect(newInt);
    };

    self.addCharacter = function () {
      $.ajax({
        type: 'POST',
        url: '/character/create',
        dataType: 'json',
        data: self.newCharacter(),
        cache: false,
        success: function (response) {
          if (response.success) {
            // add the new character to the master character list
            self.characters.push(new Character(response.character));

            // reset the new character parameters
            self.newCharacter(new Character());
          } else {
            alert('error');
            console.log(response.error);
          }
        }
      });
    };

    // populate initial class data
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

  } /* End of View Model */

  return {
    viewModel: CharacterCreaterViewModel,
    template: html
  };
});


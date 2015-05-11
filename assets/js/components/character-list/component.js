/*jslint browser: true*/
/*globals define, confirm, alert*/

define([
  'jquery',
  'knockout',
  'Character',
  'text!./template.html'
], function ($, ko, Character, html) {
  'use strict';

  function getSortIcon(isAscending) {
    return isAscending ? 'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down';
  }

  function getSortedCharacters(characters, sortBy, ascending) {
    return characters.sort(function (prev, curr) {
      var movement = 0,
        prevVal = (typeof prev[sortBy] === 'function') ? prev[sortBy]() : prev[sortBy], // hand off value in case this is computed
        currVal = (typeof curr[sortBy] === 'function') ? curr[sortBy]() : curr[sortBy]; // hand off value in case this is computed

      if (prevVal < currVal) {
        movement = (ascending === false) ? 1 : -1;
      } else if (prevVal > currVal) {
        movement = (ascending === true) ? 1 : -1;
      }

      return movement;
    });
  }

  function CharacterListViewModel() {
    // cache this to avoid conflicts later
    var self = this;

    // list data
    self.characters = ko.observableArray([]);
    self.selectedCharacter = ko.observable();

    // sort data
    self.sortAscending = ko.observable(true);
    self.sortField = ko.observable();
    self.sortIcon = ko.observable('glyphicon glyphicon-chevron-up');

    self.sortCharacterList = function (sortBy) {
      var sortDirection = (sortBy !== self.sortField()) ? true : !self.sortAscending(),
        sortIcon = getSortIcon(sortDirection),
        sorted = getSortedCharacters(self.characters(), sortBy, sortDirection);

      self.sortField(sortBy);
      self.sortAscending(sortDirection);
      self.sortIcon(sortIcon);
      self.characters(sorted);

      console.log(sortBy, self.sortField());
      console.log(sortDirection, self.sortAscending());
      console.log(sortIcon, self.sortIcon());
    };

    self.viewCharacter = function (character) {
      self.selectedCharacter(character);
    };

    self.removeCharacter = function (character) {
      if (confirm('Are you sure you want to delete this character?')) {
        $.ajax({
          type: 'POST',
          url: '/character/destroy',
          dataType: 'json',
          data: { id: character.id },
          cache: false,
          success: function (response) {
            if (response.success) {
              // update the character list
              self.characters.destroy(character);
            } else {
              alert('error');
              console.log(response.err);
            }
          }
        });
      }
    };

    self.showCharacterElement = function (element) {
      if (element.nodeType === 1) {
        $(element).hide().slideDown();
      }
    };

    self.hideCharacterElement = function (element) {
      if (element.nodeType === 1) {
        $(element).slideUp(function () {
          $(element).remove();
        });
      }
    };

    // populate initial characters from sails
    $.ajax({
      type: 'GET',
      url: '/character/getlist',
      dataType: 'json',
      cache: false,
      success: function (response) {
        if (response.success) {
          if (response.characters.length > 0) {
            var mappedCharacters = $.map(response.characters, function (c) {
              return new Character(c);
            });

            self.characters(mappedCharacters);
          }
        } else {
          alert('error');
          console.log(response.err);
        }
      }
    });

  } /* End of View Model */

  ko.components.register('character-creater', { require: 'components/character-creater/component' });
  ko.components.register('character-viewer', { require: 'components/character-viewer/component' });

  return {
    viewModel: CharacterListViewModel,
    template: html
  };
});


/*jslint browser: true*/
/*globals define, confirm, alert*/

/**
 * Character List Component
 *
 * Encapculates the character list view and
 * invokes that character-view, and 
 * character-creater components, which sync
 * with the master character list view to
 * maintain character data across the app.
 *
 * To link the character list data to another
 * component use the knockout component binding
 * and pass the following parameters:
 *
 *   characterList: characters
 *   selectedCharacter: selectedCharacter
 */

define([
  'jquery',
  'knockout',
  'Character',
  'text!./template.html'
], function ($, ko, Character, html) {
  'use strict';

  function CharacterListViewModel() {
    // cache this to avoid conflicts later
    var self = this;

    // list data
    this.characters = ko.observableArray([]);
    this.selectedCharacter = ko.observable();

    // set the selected character - this will be watched by the character-viewer component
    self.viewCharacter = function (character) {
      self.selectedCharacter(character);
    };

    // remove an existing character
    self.removeCharacter = function (character) {
      if (confirm('Are you sure you want to delete this character?')) {
        // delete the character from sails
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
  }

  // create character component
  ko.components.register('character-creater', { require: 'components/character-creater/component' });

  // view/edit character component
  ko.components.register('character-viewer', { require: 'components/character-viewer/component' });

  return {
    viewModel: CharacterListViewModel,
    template: html
  };
});


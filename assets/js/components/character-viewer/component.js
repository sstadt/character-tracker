/*jslint browser: true*/
/*globals define, alert, confirm*/

/**
 * Character Viewer Component
 *
 * Encapculates the character view and edit
 * portions of the tracker.
 */

define([
  'jquery',
  'lodash',
  'knockout',
  'Character',
  'text!./template.html'
], function ($, _, ko, Character, html) {
  'use strict';

  function CharacterViewerViewModel(params) {
    // cache this to prevent potential conflicts without having to constantly pass context arguments
    var self = this;

    self.characters = params.characterList;

    // selected character data
    self.selectedCharacter = params.selectedCharacter; // Linked to the selected character in the parent component
    self.selectedCharacterName = ko.observable();
    self.selectedCharacterBiography = ko.observable();

    self.selectedCharacter.subscribe(function (selectedCharacter) {
      self.selectedCharacterName(selectedCharacter.name);
      self.selectedCharacterBiography(selectedCharacter.bio);
    });

    self.updateCharacter = function () {
      // set up the updated character object for sails
      var updatedChar = {
        id: self.selectedCharacter().id,
        name: self.selectedCharacterName,
        bio: self.selectedCharacterBiography
      };

      // post character updates to sails
      $.ajax({
        type: 'POST',
        url: '/character/update',
        dataType: 'json',
        data: updatedChar,
        cache: false,
        success: function (response) {
          if (response.success) {
            // get the index of the character that was updated
            var charIndex = _.findIndex(self.characters(), function (c) {
              return c.id === response.character[0].id;
            });

            // update characters
            self.characters.replace(self.characters()[charIndex], new Character(response.character[0]));

            // hide the bootstrap modal
            $('#characterModal').modal('hide');
          } else {
            alert('error');
            console.log(response.err);
          }
        },
      });
    };
  }

  return {
    viewModel: CharacterViewerViewModel,
    template: html
  };
});


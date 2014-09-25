/*jslint browser: true*/
/*globals requirejs, define, alert, confirm, io*/

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

  /* View Model
  ------------------------------*/

  function CharacterViewerViewModel(params) {
    // character list
    this.characters = params.characterList;

    // selected character data
    this.selectedCharacter = params.selectedCharacter;
    this.selectedCharacterName = ko.observable();
    this.selectedCharacterBiography = ko.observable();

    // subscribe to selectedCharacter for updates
    this.selectedCharacter.subscribe(function (selectedCharacter) {
      this.selectedCharacterName(selectedCharacter.name);
      this.selectedCharacterBiography(selectedCharacter.bio);
    }, this);
  }

  /* View Model Methods
  ------------------------------*/

  // update an existing character
  CharacterViewerViewModel.prototype.updateCharacter = function () {
    // set up the updated character object for sails
    var updatedChar = {
      id: this.selectedCharacter().id,
      name: this.selectedCharacterName,
      bio: this.selectedCharacterBiography
    };

    // post character updates to sails
    $.ajax({
      context: this,
      type: 'POST',
      url: '/character/update',
      dataType: 'json',
      data: updatedChar,
      cache: false,
      success: function (response) {
        if (response.success) {
          // update self.characters
          var charIndex = _.findIndex(this.characters(), function (c) {
            return c.id === response.character[0].id;
          });

          this.characters.replace(this.characters()[charIndex], new Character(response.character[0]));

          $('#characterModal').modal('hide');
        } else {
          alert('error');
          console.log(response.err);
        }
      },
    });
  };

  return {
    viewModel: CharacterViewerViewModel,
    template: html
  };
});


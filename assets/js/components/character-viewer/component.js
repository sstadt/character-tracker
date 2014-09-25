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
  'Character',
  'text!./template.html'
], function ($, Character, html) {
  'use strict';

  /* View Model
  ------------------------------*/

  function CharacterViewerViewModel(params) {
    // character list
    this.characters = params.characterList;

    // selected character data
    this.selectedCharacter = params.selectedCharacter;
  }

  /* View Model Methods
  ------------------------------*/

  // update an existing character
  CharacterViewerViewModel.prototype.updateCharacter = function () {
    var updatedChar = {
      id: this.selectedCharacter().id,
      name: this.selectedCharacter().name,
      bio: this.selectedCharacter().bio
    };

    io.socket.post('/character/update', updatedChar, function (response) {
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
    });
  };

  return {
    viewModel: CharacterViewerViewModel,
    template: html
  };
});


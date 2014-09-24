/*jslint browser: true*/
/*globals requirejs, alert, confirm, io*/

require(['lodash', 'jquery', 'knockout', 'Character'], function (_, $, ko, Character) {
  'use strict';

  /**
   * Character List View Model
   *
   * Contains the character list data shown on
   * the index page of the app
   */
  function CharacterListViewModel() {
    // cache self so we can use it out of scope
    var self = this;

    /* View Model Data
    ------------------------------*/

    // list data
    self.characters = ko.observableArray([]);

    // selected characer date
    self.selectedCharacterId = ko.observable();
    self.selectedCharacterName = ko.observable();
    self.selectedCharacterClass = ko.observable();
    self.selectedCharacterStrength = ko.observable();
    self.selectedCharacterDexterity = ko.observable();
    self.selectedCharacterVitality = ko.observable();
    self.selectedCharacterIntellect = ko.observable();
    self.selectedCharacterBiography = ko.observable();
    self.selectedCharacterHealth = ko.observable();

    /* View Model Methods
    ------------------------------*/

    // open the view character modal
    self.viewCharacter = function (character) {
      self.selectedCharacterId(character.id);
      self.selectedCharacterName(character.name);
      self.selectedCharacterClass(character.charClass);
      self.selectedCharacterStrength(character.strength);
      self.selectedCharacterDexterity(character.dexterity);
      self.selectedCharacterVitality(character.vitality);
      self.selectedCharacterIntellect(character.intellect);
      self.selectedCharacterBiography(character.bio);
      self.selectedCharacterHealth(character.health());
    };

    // update an existing character
    self.updateCharacter = function () {
      var updatedChar = {
        id: self.selectedCharacterId(),
        name: self.selectedCharacterName(),
        bio: self.selectedCharacterBiography()
      };

      io.socket.post('/character/update', updatedChar, function (response) {
        if (response.success) {
          // update self.characters
          var charIndex = _.findIndex(self.characters(), function (c) {
            return c.id === response.character[0].id;
          });

          self.characters.replace(self.characters()[charIndex], new Character(response.character[0]));

          $('#characterModal').modal('hide');
        } else {
          alert('error');
          console.log(response.err);
        }
      });
    };

    // remove an existing character
    self.removeCharacter = function (character) {
      if (confirm('Are you sure you want to delete this character?')) {
        io.socket.post('/character/destroy', { id: character.id }, function (response) {
          if (response.success) {
            self.characters.destroy(character);
          } else {
            alert('error');
            console.log(response.err);
          }
        });
      }
    };

    /* Populate initial data
    ------------------------------*/

    // populate initial characters from api
    $.getJSON('/character/getlist', function (response) {
      if (response.success) {
        if (response.characters.length > 0) {
          var mappedCharacters = $.map(response.characters, function (c) {
            return new Character(c);
          });

          self.characters(mappedCharacters);
        }
      } else {
        alert('error getting characters');
        console.log(response);
      }
    });
  }

  /* Custom Data Binding
  ------------------------------*/

  /**
   * Custom binding for elements which contain the
   * contenteditable="true" attribute. Gives them
   * identical behavior to an input element with
   * the value binding.
   */
  ko.bindingHandlers.editableText = {
    init: function (element, valueAccessor) {
      $(element).on('blur', function () {
        var observable = valueAccessor();
        observable($(this).text());
      });
    },
    update: function (element, valueAccessor) {
      var value = ko.utils.unwrapObservable(valueAccessor());
      $(element).text(value);
    }
  };

  /* Component Registration
  ------------------------------*/

  ko.components.register('character-creater', { require: 'components/character-creater/component' });

  // apply character list view model to the dom
  ko.applyBindings(new CharacterListViewModel());
});
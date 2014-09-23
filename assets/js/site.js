/*jslint browser: true*/
/*globals requirejs, alert, confirm, io*/

requirejs.config({
  deps: [
    // vendor
    'sails', 'bootstrap',
    // classes
    'Character', 'CharacterClass'
  ],
  paths: {
    // plugins
    'text': 'plugins/text',
    // vendor
    'jquery': 'libs/jquery-2.1.1',
    'lodash': 'libs/lodash.compat',
    'bootstrap': 'libs/bootstrap',
    'knockout': 'libs/knockout-3.2.0',
    'sails': 'libs/sails.io',
    // classes
    'Character': 'classes/Character',
    'CharacterClass': 'classes/CharacterClass',
    // util
    'statistics': 'util/statistics'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

require(['lodash', 'jquery', 'knockout', 'Character'], function (_, $, ko, Character) {
  'use strict';

  var defaultStatisticValue = 14;

  /**
   * Get a particular bonus based on a character class
   * @param  {string} statistic The name of the statistic to retrieve a bonus for
   * @param  {object} charClass The character class to check bonuses for
   * @param  {object} bonuses   The list of bonus values to apply
   * @return {int}              The bonus value
   */
  function getClassBonus(statistic, charClass, bonuses) {
    var bonus = 0;

    if (charClass) {
      if (charClass.tertiary === statistic) {
        bonus = bonuses.tertiary;
      } else if (charClass.secondary === statistic) {
        bonus = bonuses.secondary;
      } else if (charClass.primary === statistic) {
        bonus = bonuses.primary;
      }
    }

    return bonus;
  }

  /**
   * Class - CharacterClass
   * 
   * Contains data associated with a character class
   * 
   *   name: name of the class
   *   primary: largest statistic
   *   secondary: second largest statistic
   *   tertiary: lowest statistic
   */
  function CharacterClass(data) {
    var self = this;

    self.name = data.name;
    self.primary = data.primary;
    self.secondary = data.secondary;
    self.tertiary = data.tertiary;
  }

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

    // class data
    self.classes = ko.observableArray([]);
    self.classOptions = ko.observableArray([]);

    // new character data
    self.newCharacterName = ko.observable();
    self.newCharacterClass = ko.observable();
    self.newCharacterStrength = ko.observable(defaultStatisticValue);
    self.newCharacterDexterity = ko.observable(defaultStatisticValue);
    self.newCharacterVitality = ko.observable(defaultStatisticValue);
    self.newCharacterIntellect = ko.observable(defaultStatisticValue);
    self.newCharacterBiography = ko.observable();

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

    // set the character class for a new character
    self.setNewCharacterClass = function () {
      var selectedClass = _.find(self.classes(), function (c) {
          return c.name === self.newCharacterClass();
        });

      self.newCharacterStrength(getClassBonus('strength', selectedClass, self.bonuses) + defaultStatisticValue);
      self.newCharacterDexterity(getClassBonus('dexterity', selectedClass, self.bonuses) + defaultStatisticValue);
      self.newCharacterVitality(getClassBonus('vitality', selectedClass, self.bonuses) + defaultStatisticValue);
      self.newCharacterIntellect(getClassBonus('intellect', selectedClass, self.bonuses) + defaultStatisticValue);
    };

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
            self.newCharacterStrength(defaultStatisticValue);
            self.newCharacterDexterity(defaultStatisticValue);
            self.newCharacterVitality(defaultStatisticValue);
            self.newCharacterIntellect(defaultStatisticValue);
            self.newCharacterBiography('');
          } else {
            alert('error');
            console.log(response.error);
          }
        },
        error: function (xhr) {
          if (!(xhr.readyState === 0 || xhr.status === 0)) {
            alert('Inernal server error.');
          }
        },
        timeout: function () {
          alert("The server is not responding.\n\nCheck your connection and try again.\n\n");
        }
      });
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

    // populate class data
    $.getJSON('/static/classes', function (response) {
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
    });

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

  // apply character list view model to the dom
  ko.applyBindings(new CharacterListViewModel());
});
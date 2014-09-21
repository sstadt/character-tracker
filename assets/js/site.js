/*jslint browser: true*/
/*globals requirejs, alert*/

requirejs.config({
  deps: ['sails', 'bootstrap'],
  paths: {
    'jquery': 'dependencies/jquery-2.1.1',
    'lodash': 'dependencies/lodash.compat',
    'bootstrap': 'dependencies/bootstrap',
    'knockout': 'dependencies/knockout-3.2.0',
    'sails': 'dependencies/sails.io'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

require(['lodash', 'jquery', 'knockout'], function (_, $, ko) {
  var defaultStatisticValue = 14;

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

  function getAdjustedStatistic(base, statistic) {
    var bonus = Math.floor((statistic - 12) / 2);
    return base + bonus;
  }

  // character
  function Character(data) {
    var self = this;

    self.id = data.id;
    self.name = data.name;
    self.charClass = data.charClass;
    self.strength = data.strength;
    self.dexterity = data.dexterity;
    self.vitality = data.vitality;
    self.intellect = data.intellect;
    self.biography = data.biography;

    self.health = ko.computed(function () {
      return getAdjustedStatistic(10, data.vitality);
    });
  }

  // character class
  function CharacterClass(data) {
    var self = this;

    self.name = data.name;
    self.primary = data.primary;
    self.secondary = data.secondary;
    self.tertiary = data.tertiary;
  }

  function CharacterListViewModel() {
    var self = this;

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

    // operations
    self.setNewCharacterClass = function () {
      var selectedClass = _.find(self.classes(), function (c) {
          return c.name === self.newCharacterClass();
        });

      self.newCharacterStrength(getClassBonus('strength', selectedClass, self.bonuses) + defaultStatisticValue);
      self.newCharacterDexterity(getClassBonus('dexterity', selectedClass, self.bonuses) + defaultStatisticValue);
      self.newCharacterVitality(getClassBonus('vitality', selectedClass, self.bonuses) + defaultStatisticValue);
      self.newCharacterIntellect(getClassBonus('intellect', selectedClass, self.bonuses) + defaultStatisticValue);
    };

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
            // success stuff
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
            // error stuff
            alert('Inernal server error.');
          }
        },
        timeout: function () {
          // timeout stuff
          alert("The server is not responding.\n\nCheck your connection and try again.\n\n");
        }
      });
    };

    self.viewCharacter = function (character) {
      console.log(character);
    };

    self.editCharacter = function (character) {
      console.log(character);
    };

    self.removeCharacter = function (character) {
      console.log(character);
    };

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

  ko.applyBindings(new CharacterListViewModel());

  // // call to get classes
  // $.ajax({
  //  type: 'GET',
  //  url: '/static/classes',
  //  dataType: 'json',
  //  cache: false,
  //  success: function (classes) {
  //    console.log('I just fetched the classes:');
  //    console.log('---------------------------------------');
  //    console.log(classes);
  //    console.log('');
  //  }
  // });

  // // call to get weapons
  // $.ajax({
  //  type: 'GET',
  //  url: '/static/weapons',
  //  dataType: 'json',
  //  cache: false,
  //  success: function (weapons) {
  //    console.log('I just fetched the weapons:');
  //    console.log('---------------------------------------');
  //    console.log(weapons);
  //    console.log('');
  //  }
  // });
});
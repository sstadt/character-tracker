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

require(['jquery', 'knockout'], function ($, ko) {

	// character class - no pun intended
	function Character(data) {
		var self = this;

		self.name = data.name;
		self.class = data.class;
		self.strength = data.strength;
		self.dexterity = data.dexterity;
		self.vitality = data.vitality;
		self.intellect = data.intellect;
		self.biography = data.biography;

		self.health = ko.computed(function () {
			var vitalityBonus = Math.floor((12 - data.vitality) / 2);
			return 10 + vitalityBonus;
		});
	}

	function CharacterListViewModel() {
		var self = this;

		// data
		self.characters = ko.observableArray([]);

		self.newCharacterName = ko.observable();
		self.newCharacterClass = ko.observable();
		self.newCharacterStrength = ko.observable();
		self.newCharacterDexterity = ko.observable();
		self.newCharacterVitality = ko.observable();
		self.newCharacterIntellect = ko.observable();
		self.newCharacterBiography = ko.observable();

		// operations
		self.addCharacter = function() {
			self.tasks.push(new Character({
				title: this.newTaskText()
			}));

			self.newCharacterName();
			self.newCharacterClass(1);
			self.newCharacterStrength(14);
			self.newCharacterDexterity(14);
			self.newCharacterVitality(14);
			self.newCharacterIntellect(14);
			self.newCharacterBiography('');
		};

		// populate initial characters from api
		$.getJSON('/getcharlist', function (characters) {
			console.log(characters);
			var mappedCharacters = $.map(characters, function(c) { return new Character(c) });
			self.characters(mappedCharacters);
		});
	}

	ko.applyBindings(new CharacterListViewModel());

	// call to get classes
	$.ajax({
		type: 'GET',
		url: '/static/classes',
		dataType: 'json',
		cache: false,
		success: function (classes) {
			console.log('I just fetched the classes:');
			console.log('---------------------------------------');
			console.log(classes);
			console.log('');
		}
	});

	// call to get weapons
	$.ajax({
		type: 'GET',
		url: '/static/weapons',
		dataType: 'json',
		cache: false,
		success: function (weapons) {
			console.log('I just fetched the weapons:');
			console.log('---------------------------------------');
			console.log(weapons);
			console.log('');
		}
	});
});
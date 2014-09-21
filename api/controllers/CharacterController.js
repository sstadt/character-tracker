/**
 * CharacterController
 *
 * @description :: Server-side logic for managing Characters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res, next) {
		res.view();
	},

	show: function (req, res, next) {
		Character.findOne(req.param('id'), function characterFound (err, character) {
			if (err) {
				next(err);
			} else {
				res.view({
					character: character
				});
			}
		});
	},

	charlist: function (req, res, next) {
		Character.find(function foundCharacters (err, characters) {
			var response = {};

			if (err) {
				response.err = err;
			} else {
				response.success = true;
				response.characters = characters;
			}

			res.json(response);
		});
	},

	create: function (req, res, next) {
		var charObj = {
			name: req.param('name'),
			charClass: req.param('charClass'),
			bio: req.param('bio'),
			health: req.param('health'),
			strength: req.param('strength'),
			dexterity: req.param('dexterity'),
			vitality: req.param('vitality'),
			intellect: req.param('intellect'),
		};

		Character.create(charObj, function characterCreated (err, character) {
			var response = {};

			if (err) {
				response.err = err;
			} else {
				console.log('');
				console.log('new character saved:');
				console.log(character);
				
				response.success = true;
				response.character = character;
			}

			res.json(response);
		});
	},

	update: function (req, res, next) {
		var charObj = {
			name: req.param('name'),
			bio: req.param('bio')
		};

		Character.update(req.param('id'), charObj, function characterUpdated (err, character) {
			var response = {};

			console.log(charObj);
			console.log(character);

			if (err) {
				response.err = err;
			} else {
				response.success = true;
				response.character = character;
			}

			res.json(response);
		});
	},

	destroy: function (req, res, next) {
		Character.destroy(req.param('id'), function (err, character) {
			var response = {};

			if (err) {
				response.err = err;
			} else {
				response.success = true;
			}

			res.json(response);
		});
	},

	dropall: function (req, res, next) {
		Character.destroy(function characterDestroyed (err) {
			res.send(200);
		});
	}
};


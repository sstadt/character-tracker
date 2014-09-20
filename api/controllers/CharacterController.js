/**
 * CharacterController
 *
 * @description :: Server-side logic for managing Characters
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function (req, res, next) {
		Character.find(function foundCharacters (err, characters) {
			if (err) {
				next(err);
			} else {
				res.view({
					characters: characters
				});
			}
		});
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

	create: function (req, res, next) {

		var charObj = {
			name: req.param('name'),
			bio: req.param('bio') || '',
			health: req.param('health'),
			strength: req.param('strength'),
			dexterity: req.param('dexterity'),
			vitality: req.param('vitality'),
			intellect: req.param('intellect'),
		};

		Character.create(req.param('character'), function characterCreated (err, character) {
			var response = {};

			if (err) {
				response.err = err;
			} else {
				respnse.success = true;
				response.character = character;
			}

			res.json(response);
		});
	},

	update: function (req, res, next) {

		var charObj = {
			name: req.param('name'),
			bio: req.param('bio') || '',
			health: req.param('health'),
			strength: req.param('strength'),
			dexterity: req.param('dexterity'),
			vitality: req.param('vitality'),
			intellect: req.param('intellect'),
		};

		Character.update(req.param('id'), charObj, function characterUpdated (err, character) {
			var response = {};

			if (err) {
				response.err = err;
			} else {
				response.success = true;
				response.character = character;
			}
		});
	}
};


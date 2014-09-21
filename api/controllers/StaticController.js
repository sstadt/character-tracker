/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	classes: function (req, res, next) {
		res.send({
			success: true,
			classes: sails.config.classes,
			bonuses: sails.config.classbonus
		});
	},
	weapons: function (req, res, next) {
		res.send({
			success: true,
			weapons: sails.config.weapons
		});
	}
};


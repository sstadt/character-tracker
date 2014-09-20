/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	classes: function (req, res, next) {
		res.send({
			classes: sails.config.classes
		});
	},
	weapons: function (req, res, next) {
		res.send({
			weapons: sails.config.weapons
		});
	}
};


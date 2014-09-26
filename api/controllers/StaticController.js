/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

/*jslint node: true*/
/*globals sails*/

module.exports = {
  classes: function (req, res, next) {
    res.json({
      success: true,
      classes: sails.config.classes,
      bonuses: sails.config.classbonus
    });
  },
  weapons: function (req, res, next) {
    res.json({
      success: true,
      weapons: sails.config.weapons
    });
  },
  comments: function (req, res, next) {
    res.json({
      success: true,
      comments: sails.config.comments
    });
  }
};


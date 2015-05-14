/*jslint browser: true*/
/*globals define*/

/**
 * statistics library
 *
 * Contains functions to help with manipulation
 * and calculations associated with character
 * statistics.
 */

define('statistics', function () {
  'use strict';

  var defaultStatisticValue = 14;

  return {

    getDefaultStat: function () {
      return defaultStatisticValue;
    },

    /**
     * Get a statistic value adjusted for by a
     * provided attribute value.
     * @param  {int} base      The base value of the statistic
     * @param  {int} attribute The attribute value that adjusts base
     * @return {int}           The adjusted statistic
     */
    getHealth: function (vitality) {
      var bonus = Math.floor((vitality - 12) / 2);
      return 10 + bonus;
    },

    /**
     * Get a particular bonus based on a character class
     * @param  {string} statistic The name of the statistic to retrieve a bonus for
     * @param  {object} charClass The character class to check bonuses for
     * @param  {object} bonuses   The list of bonus values to apply
     * @return {int}              The bonus value
     */
    getClassBonus: function (statistic, charClass, bonuses) {
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

  };

});
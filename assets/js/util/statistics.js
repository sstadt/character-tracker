define('statistics', function () {
	'use strict';

  /**
   * Get a statistic value adjusted for by a
   * provided attribute value.
   * @param  {int} base      The base value of the statistic
   * @param  {int} attribute The attribute value that adjusts base
   * @return {int}           The adjusted statistic
   */
  function getAdjustedStatistic(base, attribute) {
    var bonus = Math.floor((attribute - 12) / 2);
    return base + bonus;
  }

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

  return {
  	defaultStatisticValue: 14,
  	getAdjusted: getAdjustedStatistic,
  	getClassBonus: getClassBonus
  };
});
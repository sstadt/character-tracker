define(function () {
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

  return {
  	getAdjusted: getAdjustedStatistic
  };
});
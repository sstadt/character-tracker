
/**
 * Hard Coded Weapons
 *
 * Access in the models, controllers, and views with 'sails.config.weapons'
 *
 * Feel free to add any weapons you'd like
 */

module.exports.weapons = [
	{ name: 'Longsword', statistic: 'strength', baseDmg: 2, capDmg: 8, bonus: 2 },
	{ name: 'Mace', statistic: 'strength', baseDmg: 4, capDmg: 6, bonus: 2 },
	{ name: 'Flail', statistic: 'strength', baseDmg: 4, capDmg: 8, bonus: 0 },
	{ name: 'Dagger', statistic: 'dexterity', baseDmg: 1, capDmg: 9, bonus: 2 },
	{ name: 'Bow', statistic: 'dexterity', baseDmg: 1, capDmg: 11, bonus: 0 },
	{ name: 'Whip', statistic: 'dexterity', baseDmg: 3, capDmg: 4, bonus: 5 },
	{ name: 'Wand', statistic: 'intellect', baseDmg: 3, capDmg: 9, bonus: 0 },
	{ name: 'Staff', statistic: 'intellect', baseDmg: 3, capDmg: 6, bonus: 2 },
	{ name: 'Phylactery', statistic: 'intellect', baseDmg: 5, capDmg: 7, bonus: 0 }
];
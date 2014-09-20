
/**
 * Hard Coded Character Classes
 *
 * Access in the models, controllers, and views with 'sails.config.classes'
 *
 * Feel free to add any classes you'd like... I just added the diablo classes to be quick
 */

module.exports.classes = [
	{ name: 'Barbarian', primary: 'strength', secondary: 'vitality' },
	{ name: 'Crusader', primary: 'vitality', secondary: 'strength' },
	{ name: 'Demon Hunter', primary: 'dexterity', secondary: 'intellect' },
	{ name: 'Assassin', primary: 'dexterity', secondary: 'strength' },
	{ name: 'Amazon', primary: 'dexterity', secondary: 'vitality' },
	{ name: 'Sorceress', primary: 'intellect', secondary: 'dexterity' },
	{ name: 'Witch Doctor', primary: 'intellect', secondary: 'vitality' },
	{ name: 'Druid', primary: 'intellect', secondary: 'strength' },
	{ name: 'Necromancer', primary: 'intellect', secondary: 'dexterity' }
];

/**
 * Hard Coded Character Classes
 *
 * Access in the models, controllers, and views with 'sails.config.classes'
 *
 * Feel free to add any classes you'd like... I just added the diablo classes to be quick
 */

module.exports.classes = [
	{ id: 1, name: 'Barbarian', primary: 'strength', secondary: 'vitality' },
	{ id: 2, name: 'Crusader', primary: 'vitality', secondary: 'strength' },
	{ id: 3, name: 'Demon Hunter', primary: 'dexterity', secondary: 'intellect' },
	{ id: 4, name: 'Assassin', primary: 'dexterity', secondary: 'strength' },
	{ id: 5, name: 'Amazon', primary: 'dexterity', secondary: 'vitality' },
	{ id: 6, name: 'Sorceress', primary: 'intellect', secondary: 'dexterity' },
	{ id: 7, name: 'Witch Doctor', primary: 'intellect', secondary: 'vitality' },
	{ id: 8, name: 'Druid', primary: 'intellect', secondary: 'strength' },
	{ id: 9, name: 'Necromancer', primary: 'intellect', secondary: 'dexterity' }
];
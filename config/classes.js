
/**
 * Hard Coded Character Classes
 *
 * Access in the models, controllers, and views with 'sails.config.classes'
 *
 * Feel free to add any classes you'd like... I just added the diablo classes to be quick
 */

module.exports.classes = [
	{ id: 1, name: 'Barbarian', primary: 'strength', secondary: 'vitality',  tertiary: 'intellect' },
	{ id: 2, name: 'Crusader', primary: 'vitality', secondary: 'strength', tertiary: 'dexterity' },
	{ id: 3, name: 'Demon Hunter', primary: 'dexterity', secondary: 'intellect', tertiary: 'strength' },
	{ id: 4, name: 'Assassin', primary: 'dexterity', secondary: 'strength', tertiary: 'vitality' },
	{ id: 5, name: 'Amazon', primary: 'dexterity', secondary: 'vitality', tertiary: 'intellect' },
	{ id: 6, name: 'Sorceress', primary: 'intellect', secondary: 'dexterity', tertiary: 'vitality' },
	{ id: 7, name: 'Witch Doctor', primary: 'intellect', secondary: 'vitality', tertiary: 'dexterity' },
	{ id: 8, name: 'Druid', primary: 'intellect', secondary: 'strength', tertiary: 'dexterity' },
	{ id: 9, name: 'Necromancer', primary: 'intellect', secondary: 'dexterity', tertiary: 'strength' }
];

module.exports.classbonus = {
	primary: 6,
	secondary: 2,
	tertiary: -2
}
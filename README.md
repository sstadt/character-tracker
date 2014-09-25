# character-tracker

a [Sails](http://sailsjs.org) application

# To Do

 - [x] [scott] Set up character list
 - [x] [scott] Set up character view modal
 - [x] [scott] Set up character delete functionality
 - [x] [scott] Set up character edit functionality
 - [x] [scott] Set up folder structure for ko application
 - [x] [scott] Detach require js config from site.js
 - [x] [scott] Split off the character creater as a component
 - [ ] [scott] Split off the character viewer as a component
 - [ ] [scott] Split off the character list as a component
 - [ ] [scott] Build weapons component
 - [ ] [scott] Build level up component

# Setup

	npm install -g sails
	cd project/directory
	npm install
	sails lift

The website should now be available at `localhost:1337`

The project will initially be set to use memory, I don't think we need to hook it up to a database for the purposes of this. We don't need login, so we only need to be able to throw some data in.

I'm using the latest version of sails, so this is slightly different than what I'm using on NannyMonster. They've split the gruntfile up into separate files in the `tasks` directory. We can use components/modules to roll dice, add/update characters, and keep track of character data. I've got require in so we can use modules and ko components interchangeably.

## docs

http://sailsjs.org/#/documentation/concepts

# Templates

I've set the app to run out of `views/tracker/index.ejs`, and added a create and show template. The default homepage can be changed in `config/routes.js` is needed.

# Characters

Feel free to add anything to this list you would like to, anything you think would be appropriate to doing a capabilities demo for an ARM proposal.

## statistics 

* strength - increased by class bonuses
* dexterity - increased by class bonuses
* vitality - increased by class bonuses
* intellect - increased by class bonuses
* health - starts at 10, increased by vitality
* bio - editable
* name - editable

## classes

Classes can be configured in the `config/classes.js` file, the array of classes can be accessed in the back code via `sails.config.classes`. There are examples of how to access them on the front end in `site.js`, and on the back end in `views/tracker/index.ejs`.

## weapons

Weapons can be configured in the `config/weapons.js` file, the array of weapons can be accessed in the back code via `sails.config.weapons`

* damage - increased by statistic [str, dex, int])
* statistic - str (melee), dex (ranged), or int (magic weapon)

# character-tracker

a [Sails](http://sailsjs.org) application

# Setup

	npm install -g sails
	cd project/directory
	npm install
    bower install
	sails lift

The website should now be available at `localhost:1337`

The project will initially be set to use memory, I don't think we need to hook it up to a database for the purposes of this. We don't need login, so we only need to be able to throw some data in.

I'm using the latest version of sails, so this is slightly different than what I'm using on NannyMonster. They've split the gruntfile up into separate files in the `tasks` directory. We can use components/modules to roll dice, add/update characters, and keep track of character data. I've got require in so we can use modules and ko components interchangeably.

## docs

http://sailsjs.org/#/documentation/concepts

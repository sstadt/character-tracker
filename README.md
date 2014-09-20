# character-tracker

a [Sails](http://sailsjs.org) application

-----
Setup
-----

`npm install -s sails`
`cd project/directory`
`sails lift`

The website should now be available at `localhost:1337'

The project will initially be set to use memory, I don't think we need to hook it up to a database for the purposes of this. We don't need login, so we only need to be able to throw some data in.

I'm using the latest version of sails, so this is slightly different than what I'm using on NannyMonster. They've split the gruntfile up into separate files in the `tasks` directory.

Here's is what I'm proposing we track for the characer:

# statistics 
* strength - roll/assign
* dexterity - roll/assign
* vitality - roll/assign
* intellect - roll/assign
* health - starts at 8, increased by vitality
* bio - editable
* name - editable

# class - will be hard coded
* +2 to key statistic - str, dex, vit, int
* +1 key statistic - str, dex, vit, int

# weapon - will be hard coded
damage - increased by statistic [str, dex, int])
statistic - str (melee), dex (ranged), or int (magic weapon)

/**
* Character.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {


  schema: true,

  attributes: {

    name: {
      type: 'string',
      required: true
    },
    charClass: {
        type: 'string',
        required: true
    },
    strength: {
    	type: 'integer',
    	required: true
    },
    dexterity: {
    	type: 'integer',
    	required: true
    },
    vitality: {
    	type: 'integer',
    	required: true
    },
    intellect: {
    	type: 'integer',
    	required: true
    },
    weapons: {
      type: 'array'
    },
    bio: {
    	type: 'string'
    },
    toJSON: function () {
        var obj = this.toObject();

        delete obj.createdAt;
        delete obj.updatedAt;

        return obj;
    }

  }
};


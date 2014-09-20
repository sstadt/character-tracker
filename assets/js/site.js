requirejs.config({
	deps: ['bootstrap'],
	paths: {
		'jquery': 'dependencies/jquery-2.1.1',
		'lodash': 'dependencies/lodash.compat',
		'bootstrap': 'dependencies/bootstrap',
		'knockout': 'dependencies/knockout-3.2.0',
		'sails': 'dependencies/sails.io'
	},
	shim: {
		'bootstrap': {
			deps: ['jquery']
		}
	}
});

require(['jquery'], function ($) {

	// call to get classes
	$.ajax({
		type: 'GET',
		url: '/static/classes',
		dataType: 'json',
		cache: false,
		success: function (classes) {
			console.log('I just fetched the classes:');
			console.log('---------------------------------------');
			console.log(classes);
			console.log('');
		}
	});

	// call to get weapons
	$.ajax({
		type: 'GET',
		url: '/static/weapons',
		dataType: 'json',
		cache: false,
		success: function (weapons) {
			console.log('I just fetched the weapons:');
			console.log('---------------------------------------');
			console.log(weapons);
			console.log('');
		}
	});
});
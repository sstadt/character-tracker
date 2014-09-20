$(function(){

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
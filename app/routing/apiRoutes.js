var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends.js');

// Export API routes
module.exports = function(app) {

	// List of friends
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;

		var userResponses = userInput.scores;

		// Compute best friend match
		var scores = []; 
		var match = 0;

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(parseInt(friends[i].scores[j]) - parseInt(userResponses[j]));
			}

			scores.push(diff);

		}

		for (var y = 0; y < scores.length; y++) {
			if (scores[y] <= scores[match]) {
				match = y;
			}
		}

		var matchedFriend = friends[match];

		res.json(matchedFriend);

		friends.push(userInput);

	});
};
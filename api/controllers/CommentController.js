/**
 * CommentController
 *
 * @description :: Server-side logic for managing Comments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	insert: function (req, res, next) {
		if (req.param('author')) {
			Comment.create({
				author: req.param('author'),
				text: req.param('text')
			}, function commentCreated(err, comment) {
				if (err) {
					res.json({ err: err });
				} else {
					Comment.find(function commentFound(err, comments) {
						var response = {};

						if (err) {
							response.err = err;
						} else {
							response.success = true;
							response.comment = comments;
						}

						res.json(response);
					});
				}
			});
		} else {
			Comment.find(function commentFound(err, comments) {
				var response = {};

				if (err) {
					response.err = err;
				} else {
					response.success = true;
					response.comments = (comments.length > 0) ? comments : sails.config.comments;
				}

				res.json(response);
			});
		}
	}
};


'use strict';

exports.get = function(statusCode, message) {
	return {
		statusCode: statusCode,
		body: JSON.stringify({
			message: message
		})
	};
}
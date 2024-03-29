(function() {
	'use strict';

	angular
		.module('blocks.logger')
		.factory('exception', exception);

	exception.$inject = ['$q', 'logger'];

	function exception($q, logger) {
		let service = {
			catcher: catcher
		};

		return service;
		///////////////

		function catcher(message) {
			return function(e) {
				var thrownDescription;
		        var newMessage;
		        if (e.data && e.data.description) {
		          thrownDescription = '\n' + e.data.description;
		          newMessage = message + thrownDescription;
		        }
		        e.data.description = newMessage;
		        logger.error(newMessage);
		        return $q.reject(e);
			};
		}
	}
})();
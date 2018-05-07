(function() {
	'use strict';

	angular
		.module('trainingPlanner',[
			'app.core',
			'trainingPlanner.layout',
			'trainingPlanner.summary',
			'trainingPlanner.workout',
			'trainingPlanner.exercise',
			'trainingPlanner.parameter',
		]);
})();
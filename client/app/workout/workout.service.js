(function() {
	'use strict';

	angular
		.module('trainingPlanner.workout')
		.factory('workoutService', workoutService);

	workoutService.$inject = ['$q', 'exception', 'logger', '$resource'];

	let bodyPartsResponse = {
		status: 'success',
		data: ['ABS', 'CHEST', 'UPPER BACK', 'LOWER BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'LEGS'],
	};

	let BASE_URL = 'http://localhost:3000';
	
	function workoutService($q, exception, logger, $resource) {
		let service = {
			getWorkouts: getWorkouts,
			getWorkout: getWorkout,
			getWorkoutExercises: getWorkoutExercises,
			getWorkoutParameters: getWorkoutParameters,
			insertWorkout: insertWorkout,
			removeWorkout: removeWorkout,
			getExerciseTypes: getExerciseTypes,
			insertExercise: insertExercise,
			removeExercise: removeExercise,
			updateExercise: updateExercise,
			getBodyParts: getBodyParts,
			insertParameter: insertParameter,
			updateParameter: updateParameter,
			removeParameter: removeParameter,
		};

		return service;
		///////////////

		// Workout
		function getWorkouts() {
			return $resource(BASE_URL + '/workouts').get().$promise;
		}

		function getWorkout(id) {
			return $resource(BASE_URL + `/workouts/${id}`).get().$promise;
		}

		function insertWorkout(workout) {
			return $resource(BASE_URL + `/workouts/`).save(workout).$promise;
		}

		function removeWorkout(id) {
			return $resource(BASE_URL + `/workouts/${id}`).remove().$promise;
		}

		// Exercises
		function getWorkoutExercises(workoutId) {
			return $resource(BASE_URL + `/workouts/${workoutId}/exercises`).get().$promise;
		}

		// Parameters
		function insertParameter(workoutId, parameter) {
			return $resource(BASE_URL + `/workouts/${workoutId}/parameters`).save(parameter).$promise;
		}
		function updateParameter(parameter) {
			return $resource(BASE_URL + `/parameters/${parameter.id}`, null, {
				'update': {
					method: 'PUT'
				}
			}).update(parameter).$promise;
		}
		function removeParameter(id) {
			return $resource(BASE_URL + `/parameters/${id}`).remove().$promise;
		}
		function getWorkoutParameters(workoutId) {
			return $resource(BASE_URL + `/workouts/${workoutId}/parameters`).get().$promise;
		}

		function getExerciseTypes() {
			return $resource(BASE_URL + '/exercise-types').get().$promise;
		}
		function insertExercise(exercise) {
			let requestBody = angular.copy(exercise);
			requestBody.bodyPartsEngaged = requestBody.bodyPartsEngaged.join(',');
			return $resource(BASE_URL + '/exercises').save(requestBody).$promise;
		}

		function removeExercise(id) {
			return $resource(BASE_URL + `/exercises/${id}`).remove().$promise;
		}

		function updateExercise(exercise) {
			let requestBody = angular.copy(exercise);
			requestBody.bodyPartsEngaged = requestBody.bodyPartsEngaged.join(',');
			return $resource(BASE_URL + `/exercises/${exercise.id}`, null, {
			    'update': { 
			    	method:'PUT' 
			    }
			}).update(requestBody).$promise;
		}

		function getBodyParts() {
			let deferred = $q.defer();
			deferred.resolve(bodyPartsResponse);
			return deferred.promise;
		}
	}
})();
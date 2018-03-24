(function() {
	'use strict';

	angular
		.module('app.core')
		.factory('dataService', dataService);

	dataService.$inject = ['$q', 'exception', 'logger', '$resource'];

	let USER_MOCK = {
		firstName: 'John',
		lastName: 'Doe',
		getName: function() {
			return this.firstName + ' ' + this.lastName
		},
		bodyType: 'endomorph',
		height: '1.81m',
		weight: '70kg',
	};

	let BODY_PARTS = {
		status: 'success',
		data: ['ABS', 'CHEST', 'UPPER BACK', 'LOWER BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'LEGS'],
	};

	let BASE_URL = 'http://localhost:3000';
	
	function dataService($q, exception, logger, $resource) {
		let service = {
			getUser: getUser,
			getWorkouts: getWorkouts,
			getWorkout: getWorkout,
			updateWorkout: updateWorkout,
			getWorkoutExercises: getWorkoutExercises,
			getWorkoutParameters: getWorkoutParameters,
			insertWorkout: insertWorkout,
			removeWorkout: removeWorkout,
			getExerciseTypes: getExerciseTypes,
			insertExerciseType: insertExerciseType,
			removeExerciseType: removeExerciseType,
			getExercises: getExercises,
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

		// User

		function getUser() {
			let deferred = $q.defer();
			deferred.resolve(USER_MOCK);
			return deferred.promise;
		}

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

		function updateWorkout(workout) {
			return $resource(BASE_URL + `/workouts/${workout.Id}`, null, {
			    'update': { 
			    	method: 'PUT' 
			    }
			}).update(workout).$promise;
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

		function insertExerciseType(exerciseType) {
			return $resource(BASE_URL + '/exercise-types').save(exerciseType).$promise;
		}

		function removeExerciseType(id) {
			return $resource(BASE_URL + `/exercise-types/${id}`).remove().$promise;
		}

		function getExercises() {
			return $resource(BASE_URL + '/exercises').get().$promise;
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
			    	method: 'PUT' 
			    }
			}).update(requestBody).$promise;
		}

		function getBodyParts() {
			let deferred = $q.defer();
			deferred.resolve(BODY_PARTS);
			return deferred.promise;
		}
	}
})();
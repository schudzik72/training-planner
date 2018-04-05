'use strict';
describe('dataService', function() {
    
	let mocks = {};

    let BASE_URL = 'http://localhost:3000';

    beforeEach(function() {
    	mocks = {
        	workouts: mockData.getWorkouts(),
	        workout: mockData.getWorkout(),
	        workoutExercises: mockData.getWorkoutExercises(),
	        workoutParameters: mockData.getWorkoutParameters(),
	        parameter: mockData.getParameter(),
	        exerciseTypes: mockData.getExerciseTypes(),
	        exerciseType: mockData.getExerciseType(),
	        exercises: mockData.getExercises(),
	        exercise: mockData.getExercise(),
	    };
        bard.appModule('trainingPlanner');
        bard.inject('$httpBackend', '$rootScope', 'dataService');
    });


    it('should be registered', function() {
        expect(dataService).not.to.equal(null);
    });

    describe('getUser', function() {
    	it('should be defined', function() {
    		assert.isDefined(dataService.getUser, 'method is defined');
    	});

    	it('should return user', function(done) {
    		dataService.getUser()
    			.then(function(user) {
    				expect(user).not.to.equal(null);
	    			assert.isObject(user, 'user is an object');
    				expect(user.firstName).not.to.equal(null);
    				expect(user.lastName).not.to.equal(null);
    				expect(user.getName()).to.equal(user.firstName + ' ' + user.lastName);
    				expect(user.bodyType).not.to.equal(null);
    				expect(user.height).not.to.equal(null);
    				expect(user.weight).not.to.equal(null);
    			}).then(done, done);
    		$rootScope.$apply();
    	});
    });

    describe('getWorkouts', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.getWorkouts, 'method is defined');
    	});

    	it('return list of workouts', function(done) {
            $httpBackend.whenGET(BASE_URL + '/workouts').respond(mocks.workouts);
    		dataService.getWorkouts()
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert(Array.isArray(response.data));
    				expect(response.data).to.have.lengthOf(2);
    			}).then(done, done);
        	$httpBackend.flush();
    	});
    });

    describe('getWorkout', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.getUser, 'method is defined');
    	});

    	it('returns workout', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/workouts/1').respond(mocks.workout);
    		dataService.getWorkout(1)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
	    			assert.isObject(response.data, 'response data is workout object');
	    			assert.isDefined(response.data.id, 'workout id is defined');
    				expect(response.data.name).to.equal('Mass');
    				expect(response.data.description).to.equal('Workout focused on gaining body mass');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('insertWorkout', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.insertWorkout, 'method is defined');
    	});

    	it('inserts workout', function(done) {
    		$httpBackend.whenPOST(BASE_URL + '/workouts').respond(mocks.workout);
    		dataService.insertWorkout(mocks.workout)
    			.then(function(response) {
	    			assert.isDefined(response, 'response is defined');
	    			expect(response.status).to.equal('success');
	    			expect(response.data).not.to.equal(null);
	    			assert.isObject(response.data, 'response data is workout object');
	    			assert.isDefined(response.data.id, 'workout id is defined');
	    			expect(response.data.name).to.equal('Mass');
	    			expect(response.data.description).to.equal('Workout focused on gaining body mass');
	    		}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('updateWorkout', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.updateWorkout, 'method is defined');
    	});

    	it('updates workout', function(done) {
    		let workout = mocks.workout.data;
    		workout.id = 1;
    		workout.description = 'test description';
    		$httpBackend.whenPUT(BASE_URL + '/workouts/1').respond(mocks.workout);
    		dataService.updateWorkout(workout)
    			.then(function(response) {
	    			assert.isDefined(response, 'response is defined');
	    			expect(response.status).to.equal('success');
	    			expect(response.data).not.to.equal(null);
	    			assert.isObject(response.data, 'response data is workout object');
	    			expect(response.data.id).to.equal(workout.id);
	    			expect(response.data.name).to.equal('Mass');
	    			expect(response.data.description).to.equal('test description');
	    		}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('removeWorkout', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.updateWorkout, 'method is defined');
    	});

    	it('removes workout', function(done) {
    		$httpBackend.whenDELETE(BASE_URL + '/workouts/1').respond({status: 'success'});
    		dataService.removeWorkout(1)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getWorkoutExercises', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.getWorkoutExercises, 'method is defined');
    	});

    	it('return list of workout exercises', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/workouts/1/exercises').respond(mocks.workoutExercises);
    		dataService.getWorkoutExercises(1)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data).to.have.lengthOf(2);
    				assert(Array.isArray(response.data));
    				expect(response.data[0].workoutId).to.equal(1);
    				expect(response.data[1].workoutId).to.equal(1);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getWorkoutParameters', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.getWorkoutParameters, 'method is defined');
    	});

    	it('return list of workout parameters', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/workouts/1/parameters').respond(mocks.workoutParameters);
    		dataService.getWorkoutParameters(1)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert(Array.isArray(response.data));
    				expect(response.data).to.have.lengthOf(2);
    				expect(response.data[0].workoutId).to.equal(1);
    				expect(response.data[1].workoutId).to.equal(1);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getExerciseTypes', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.getExerciseTypes, 'method is defined');
    	});

    	it('return list of exercise types', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/exercise-types').respond(mocks.exerciseTypes);
    		dataService.getExerciseTypes()
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert(Array.isArray(response.data));
    				expect(response.data).to.have.lengthOf(2);
    				expect(response.data[0].type).to.equal('PUSH');
    				expect(response.data[1].type).to.equal('BODYWEIGHT');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('insertExerciseType', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.insertExerciseType, 'method is defined');
    	});

    	it('inserts exercise types', function(done) {
    		$httpBackend.whenPOST(BASE_URL + '/exercise-types').respond(mocks.exerciseType);
    		let exerciseType = {
    			type: 'PUSH'
    		};
    		dataService.insertExerciseType(exerciseType)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert.isObject(response.data, 'response data is exercise type object');
	    			assert.isDefined(response.data.id, 'exercise type id is defined');
    				expect(response.data.type).to.equal('PUSH');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('removeExerciseType', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.removeExerciseType, 'method is defined');
    	});

    	it('removes exercise types', function(done) {
    		$httpBackend.whenDELETE(BASE_URL + '/exercise-types/1').respond({status: 'success'});
    		dataService.removeExerciseType(1)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getExercises', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.getExercises, 'method is defined');
    	});

    	it('return list of exercises', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/exercises').respond(mocks.exercises);
    		dataService.getExercises()
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
					assert(Array.isArray(response.data));   				
    				expect(response.data).to.have.lengthOf(4);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('insertExercise', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.insertExercise, 'method is defined');
    	});

    	it('inserts exercise', function(done) {
    		let exercise = {
    			name: 'Chest press',
                description: 'test description',
                exerciseTypeId: 1,
                bodyPartsEngaged: ['CHEST', 'ABS', 'TRICEPS'],
                linkToExercise: 'http://abc.com',
                workoutId: 1,
    		};
    		$httpBackend.whenPOST(BASE_URL + '/exercises').respond(mocks.exercise);
    		dataService.insertExercise(exercise)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert.isObject(response.data, 'response data is an exercise object');
    				assert.isDefined(response.data.id, 'exercise id is defined');
    				expect(response.data.name).to.equal('Chest press');
    				expect(response.data.description).to.equal('test description');
    				expect(response.data.exerciseTypeId).to.equal(1);
    				expect(response.data.bodyPartsEngaged).to.equal('CHEST,ABS,TRICEPS');
    				expect(response.data.linkToExercise).to.equal('http://abc.com');
    				expect(response.data.workoutId).to.equal(1);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('updateExercise', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.updateExercise, 'method is defined');
    	});

    	it('updates exercise', function(done) {
    		let exercise = mocks.exercise;
    		exercise.data.bodyPartsEngaged = exercise.data.bodyPartsEngaged.split(',');
    		exercise.data.name = 'test';

    		$httpBackend.whenPUT(BASE_URL + '/exercises/' + exercise.data.id).respond(exercise);
    		dataService.updateExercise(exercise.data)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.equal(null);
    				assert.isObject(response.data, 'response data is an exercise object');
    				expect(response.data.id).to.equal(exercise.data.id);
    				expect(response.data.name).to.equal('test');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('removeExercise', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.removeExercise, 'method is defined');
    	});

    	it('removes exercise', function(done) {
    		$httpBackend.whenDELETE(BASE_URL + '/exercises/1').respond({status: 'success'});
    		dataService.removeExercise(1)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getBodyParts', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.getBodyParts, 'method is defined');
    	});

    	it('return body parts', function(done) {
    		dataService.getBodyParts()
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert(Array.isArray(response.data));
    			}).then(done, done);
    		$rootScope.$apply();
    	});
    });

    describe('insertParameter', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.insertParameter, 'method is defined');
    	});

    	it('inserts parameter', function(done) {
    		let parameter = {
    			name: 'Sets',
    			value: '8-12',
    			workoutId: 1
    		};
    		$httpBackend.whenPOST(BASE_URL + '/workouts/1/parameters').respond(mocks.parameter);
    		dataService.insertParameter(parameter.workoutId, parameter)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert.isObject(response.data, 'response data is an parameter object');
    				assert.isDefined(response.data.id, 'parameter id is defined');
    				expect(response.data.name).to.equal(parameter.name);
    				expect(response.data.value).to.equal(parameter.value);
    				expect(response.data.workoutId).to.equal(parameter.workoutId);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('updateParameter', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.updateParameter, 'method is defined');
    	});

    	it('updates parameter', function(done) {
    		let parameter = mocks.parameter;
    		parameter.data.name = 'Repetitions';
    		$httpBackend.whenPUT(BASE_URL + '/parameters/' + parameter.data.id).respond(parameter);
    		dataService.updateParameter(parameter.data)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				assert.isObject(response.data);
    				expect(response.data.id).to.equal(parameter.data.id);
    				expect(response.data.name).to.equal('Repetitions');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('removeParameter', function() {
    	it('should exist', function() {
    		assert.isDefined(dataService.removeParameter, 'method is defined');
    	});

    	it('removes parameter', function(done) {
    		$httpBackend.whenDELETE(BASE_URL + '/parameters/1').respond({status:'success'});
    		dataService.removeParameter(1)
    			.then(function(response) {
    				assert.isDefined(response, 'response is defined');
    				expect(response.status).to.equal('success');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    bard.verifyNoOutstandingHttpRequests();

});
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
    		expect(dataService.getUser).not.to.equal(undefined);
    	});

    	it('should return user', function(done) {
    		dataService.getUser()
    			.then(function(user) {
    				expect(user).not.to.equal(null);
    				expect(user.firstName).not.to.equal(null);
    				expect(user.lastName).not.to.equal(null);
    				expect(user.getName()).to.equal(user.firstName + ' ' + user.lastName);
    				expect(user.bodyType).not.to.equal(null);
    				expect(user.height).not.to.equal(null);
    				expect(user.weight).not.to.equal(null);
    			}).then(done, done);
    		$rootScope.$apply();
    		$httpBackend.flush();
    	});
    });

    describe('getWorkouts', function() {
    	it('should exist', function() {
    		expect(dataService.getWorkouts).not.to.equal(undefined);
    	});

    	it('return list of workouts', function(done) {
            $httpBackend.whenGET(BASE_URL + '/workouts').respond(mocks.workouts);
    		dataService.getWorkouts()
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data.length).to.equal(2);
    			}).then(done, done);
        	$httpBackend.flush();
    	});
    });

    describe('getWorkout', function() {
    	it('should exist', function() {
    		expect(dataService.getUser).not.to.equal(undefined);
    	});

    	it('returns workout', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/workouts/1').respond(mocks.workout);
    		dataService.getWorkout(1)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data.id).to.equal(1);
    				expect(response.data.name).to.equal('Mass');
    				expect(response.data.description).to.equal('Workout focused on gaining body mass');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('insertWorkout', function() {
    	it('should exist', function() {
    		expect(dataService.insertWorkout).not.to.equal(undefined);
    	});

    	it('inserts workout', function(done) {
    		$httpBackend.whenPOST(BASE_URL + '/workouts').respond(mocks.workout);
    		dataService.insertWorkout(mocks.workout)
    			.then(function(response) {
	    			expect(response).not.to.equal(null);
	    			expect(response.status).to.equal('success');
	    			expect(response.data).not.to.equal(null);
	    			expect(response.data.id).to.equal(1);
	    			expect(response.data.name).to.equal('Mass');
	    			expect(response.data.description).to.equal('Workout focused on gaining body mass');
	    		}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('updateWorkout', function() {
    	it('should exist', function() {
    		expect(dataService.updateWorkout).not.to.equal(undefined);
    	});

    	it('updates workout', function(done) {
    		let workout = mocks.workout.data;
    		workout.id = 1;
    		workout.description = 'test description';
    		$httpBackend.whenPUT(BASE_URL + '/workouts/1').respond(mocks.workout);
    		dataService.updateWorkout(workout)
    			.then(function(response) {
	    			expect(response).not.to.equal(null);
	    			expect(response.status).to.equal('success');
	    			expect(response.data).not.to.equal(null);
	    			expect(response.data.id).to.equal(1);
	    			expect(response.data.name).to.equal('Mass');
	    			expect(response.data.description).to.equal('test description');
	    		}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('removeWorkout', function() {
    	it('should exist', function() {
    		expect(dataService.updateWorkout).not.to.equal(undefined);
    	});

    	it('removes workout', function(done) {
    		$httpBackend.whenDELETE(BASE_URL + '/workouts/1').respond({status: 'success'});
    		dataService.removeWorkout(1)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getWorkoutExercises', function() {
    	it('should exist', function() {
    		expect(dataService.getWorkoutExercises).not.to.equal(undefined);
    	});

    	it('return list of workout exercises', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/workouts/1/exercises').respond(mocks.workoutExercises);
    		dataService.getWorkoutExercises(1)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data.length).to.equal(2);
    				expect(response.data[0].workoutId).to.equal(1);
    				expect(response.data[1].workoutId).to.equal(1);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getWorkoutParameters', function() {
    	it('should exist', function() {
    		expect(dataService.getWorkoutParameters).not.to.equal(undefined);
    	});

    	it('return list of workout parameters', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/workouts/1/parameters').respond(mocks.workoutParameters);
    		dataService.getWorkoutParameters(1)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data.length).to.equal(2);
    				expect(response.data[0].workoutId).to.equal(1);
    				expect(response.data[1].workoutId).to.equal(1);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getExerciseTypes', function() {
    	it('should exist', function() {
    		expect(dataService.getExerciseTypes).not.to.equal(undefined);
    	});

    	it('return list of exercise types', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/exercise-types').respond(mocks.exerciseTypes);
    		dataService.getExerciseTypes()
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data.length).to.equal(2);
    				expect(response.data[0].type).to.equal('PUSH');
    				expect(response.data[1].type).to.equal('BODYWEIGHT');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('insertExerciseType', function() {
    	it('should exist', function() {
    		expect(dataService.insertExerciseType).not.to.equal(undefined);
    	});

    	it('inserts exercise types', function(done) {
    		$httpBackend.whenPOST(BASE_URL + '/exercise-types').respond(mocks.exerciseType);
    		let exerciseType = {
    			type: 'PUSH'
    		};
    		dataService.insertExerciseType(exerciseType)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data.id).not.to.equal(undefined);
    				expect(response.data.type).to.equal('PUSH');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('removeExerciseType', function() {
    	it('should exist', function() {
    		expect(dataService.removeExerciseType).not.to.equal(undefined);
    	});

    	it('removes exercise types', function(done) {
    		$httpBackend.whenDELETE(BASE_URL + '/exercise-types/1').respond({status: 'success'});
    		dataService.removeExerciseType(1)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getExercises', function() {
    	it('should exist', function() {
    		expect(dataService.getExercises).not.to.equal(undefined);
    	});

    	it('return list of exercises', function(done) {
    		$httpBackend.whenGET(BASE_URL + '/exercises').respond(mocks.exercises);
    		dataService.getExercises()
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(null);
    				expect(response.data.length).to.equal(4);
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('insertExercise', function() {
    	it('should exist', function() {
    		expect(dataService.insertExercise).not.to.equal(undefined);
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
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.to.equal(undefined);
    				expect(response.data.id).not.to.equal(undefined);
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
    		expect(dataService.updateExercise).not.to.equal(undefined);
    	});

    	it('updates exercise', function(done) {
    		let exercise = mocks.exercise;
    		exercise.data.bodyPartsEngaged = exercise.data.bodyPartsEngaged.split(',');
    		exercise.data.name = 'test';

    		$httpBackend.whenPUT(BASE_URL + '/exercises/' + exercise.data.id).respond(exercise);
    		dataService.updateExercise(exercise.data)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    				expect(response.data).not.equal(null);
    				expect(response.data.id).to.equal(exercise.data.id);
    				expect(response.data.name).to.equal('test');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('removeExercise', function() {
    	it('should exist', function() {
    		expect(dataService.removeExercise).not.to.equal(undefined);
    	});

    	it('removes exercise', function(done) {
    		$httpBackend.whenDELETE(BASE_URL + '/exercises/1').respond({status: 'success'});
    		dataService.removeExercise(1)
    			.then(function(response) {
    				expect(response).not.to.equal(null);
    				expect(response.status).to.equal('success');
    			}).then(done, done);
    		$httpBackend.flush();
    	});
    });

    describe('getBodyParts', function() {
    	it('should exist', function() {
    		expect(dataService.getBodyParts).not.to.equal(undefined);
    	});

    	it('return body parts', function() {

    	});
    });

    describe('insertParameter', function() {
    	it('should exist', function() {
    		expect(dataService.insertParameter).not.to.equal(undefined);
    	});

    	it('inserts parameter', function() {

    	});
    });

    describe('updateParameter', function() {
    	it('should exist', function() {
    		expect(dataService.updateParameter).not.to.equal(undefined);
    	});

    	it('updates parameter', function() {

    	});
    });

    describe('removeParameter', function() {
    	it('should exist', function() {
    		expect(dataService.removeParameter).not.to.equal(undefined);
    	});

    	it('removes parameter', function() {

    	});
    });

    bard.verifyNoOutstandingHttpRequests();

});
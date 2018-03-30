'use strict';
describe('dataService', function() {
    
	var mocks = {};

    let BASE_URL = 'http://localhost:3000';

    beforeEach(function() {
    	mocks = {
        	workouts: mockData.getWorkouts(),
	        workout: mockData.getWorkout(),
	    };
        bard.appModule('trainingPlanner');
        bard.inject('$httpBackend', '$rootScope', 'dataService');
    });


    it('should be registered', function() {
        expect(dataService).not.to.equal(null);
    });

    describe('getUser', function() {
    	it('should be defined', function() {
    		expect(dataService.getUser).not.to.equal(null);
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
    		expect(dataService.getWorkouts).not.to.equal(null);
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
    		expect(dataService.getUser).not.to.equal(null);
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
    		expect(dataService.insertWorkout).not.to.equal(null);
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
    		expect(dataService.updateWorkout).not.to.equal(null);
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
    		expect(dataService.updateWorkout).not.to.equal(null);
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
    		expect(dataService.getWorkoutExercises).not.to.equal(null);
    	});

    	it('return list of workout exercises', function() {

    	});
    })

    bard.verifyNoOutstandingHttpRequests();

});
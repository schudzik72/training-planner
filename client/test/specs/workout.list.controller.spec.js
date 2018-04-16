'use strict';
describe('trainingPlanner.workout', function() {

	let controller;
	let mocks = {};

	let deferred;
	let getWorkoutsStub;
	let loggerSuccessSpy;

	beforeEach(function() {

		bard.appModule('trainingPlanner.workout');
		bard.inject('$httpBackend', '$controller', '$rootScope', '$q', 'logger', '$mdDialog', 'dataService');
	
	}); 

	beforeEach(function() {

		getWorkoutsStub = sinon.stub(dataService, 'getWorkouts');
		deferred = $q.defer();
		getWorkoutsStub.returns(deferred.promise);

		loggerSuccessSpy = sinon.spy(logger, 'success');
		controller = $controller('WorkoutListController');
		$rootScope.$apply();
	});

	describe('WorkoutListController', function() {
		
		it('should be defined', function() {
			expect(controller).to.not.be.undefined;
		});

		describe('after init', function() {

			it('should call logger success', function() {
				deferred.resolve(mockData.getWorkouts());
				$rootScope.$apply();
				expect(loggerSuccessSpy.called).to.be.true;
			});

			it('should have 2 workouts', function() {
				deferred.resolve(mockData.getWorkouts());
				$rootScope.$apply();
				expect(controller.workouts).to.have.lengthOf(2);
			});

			it('should be loaded', function() {
				deferred.resolve(mockData.getWorkouts());
				$rootScope.$apply();
				expect(controller.loaded).to.be.true;
			});

			it('should\'t load', function() {
				deferred.reject();
				$rootScope.$apply();
				expect(controller.loaded).to.be.false;
			});
		
		});

	});

});
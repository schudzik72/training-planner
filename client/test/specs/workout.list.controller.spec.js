'use strict';
describe('trainingPlanner.workout', function() {

	let controller;

	let deferred;

	let getWorkoutsStub;
	let insertWorkoutStub;
	let removeWorkoutStub;
	let loggerInfoSpy;
	let loggerSuccessSpy;
	let mdDialogShowStub;

	beforeEach(function() {

		bard.appModule('trainingPlanner.workout');
		bard.inject('$controller', '$rootScope', '$q', 'logger', '$mdDialog', 'dataService');
	
	}); 

	beforeEach(function() {

		getWorkoutsStub = sinon.stub(dataService, 'getWorkouts');
		mdDialogShowStub = sinon.stub($mdDialog, 'show');

		deferred = $q.defer();
		
		getWorkoutsStub.returns(deferred.promise);
		mdDialogShowStub.returns(deferred.promise);


		loggerInfoSpy = sinon.spy(logger, 'info');
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

		describe('showAddWorkoutForm', function() {

			beforeEach(function(done) {

				setTimeout(function() {
					insertWorkoutStub = sinon.stub(dataService, 'insertWorkout');
					insertWorkoutStub.returns(deferred.promise);

					$rootScope.$apply();
					done();
				}, 0);
			});

			it('should be defined', function() {

				expect(controller.showAddWorkoutForm).to.not.be.undefined;
			});

			it('should call $mdDailog.show', function() {

				deferred.resolve(mockData.getWorkout());
				$rootScope.$apply();

				controller.showAddWorkoutForm();
				expect(mdDialogShowStub.firstCall.args[0].controller).to.be.equal('WorkoutFormController');
				expect(mdDialogShowStub.firstCall.args[0].controllerAs).to.be.equal('vm');
				expect(mdDialogShowStub.firstCall.args[0].bindToController).to.be.true;
				expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.be.equal('app/workout/workout.form.html');
				expect(mdDialogShowStub.firstCall.args[0].clickOutsideToClose).to.be.true;
			});

			it('should return and try to insert workout', function(done) {

				mdDialogShowStub.resolves(mockData.getWorkout());
				insertWorkoutStub.resolves({
					data: {
						id: 1
					},
					status: 'success'
				});
				$rootScope.$apply();
				
				controller.showAddWorkoutForm();
				setTimeout(() => {
					expect(insertWorkoutStub.firstCall).to.not.be.undefined;
					expect(loggerSuccessSpy.called).to.be.true;
					expect(controller.workouts).to.have.lengthOf(1);
					done();
				}, 0);

			});

		});

		describe('removeWorkout', function() {

			beforeEach(function(done) {
				
				setTimeout(function() {
					removeWorkoutStub = sinon.stub(dataService, 'removeWorkout');
					removeWorkoutStub.returns(deferred.promise);

					$rootScope.$apply();
					done();
				}, 0);
			});

			it('should be defined', function() {

				expect(controller.removeWorkout).to.not.be.undefined;
			});

			it('should remove workout', function(done) {

				mdDialogShowStub.resolves(mockData.getWorkout());
				insertWorkoutStub.resolves({
					data: {
						id: 1
					},
					status: 'success'
				});
				removeWorkoutStub.resolves({
					status: 'success'
				});
				$rootScope.$apply();
				controller.workouts.push(mockData.getWorkout().data);

				controller.removeWorkout(0);
				setTimeout(() => {
					expect(removeWorkoutStub.firstCall).to.not.be.undefined;
					expect(loggerSuccessSpy.called).to.be.true;
					expect(controller.workouts).to.have.lengthOf(0);
					done();
				});

			});

		});

	});

});
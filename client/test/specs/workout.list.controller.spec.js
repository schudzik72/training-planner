'use strict';
describe('trainingPlanner.workout', function() {

	let controller;

	let getWorkoutsStub;
	let insertWorkoutStub;
	let removeWorkoutStub;
	let loggerSuccessSpy;
	let mdDialogShowStub;

	beforeEach(function() {

		bard.appModule('trainingPlanner.workout');
		bard.inject('$controller', '$rootScope', '$q', 'logger', '$mdDialog', 'dataService');
	
	}); 

	beforeEach(function() {

		loggerSuccessSpy = sinon.spy(logger, 'success');

		getWorkoutsStub = sinon.stub(dataService, 'getWorkouts');
		
		getWorkoutsStub.resolves(mockData.getWorkouts());

		controller = $controller('WorkoutListController');
		$rootScope.$apply();
	});

	describe('WorkoutListController', function() {
		
		it('should be defined', function() {
			
			expect(controller).to.not.be.undefined;
		});

		describe('after init', function() {

			it('should call logger success', function(done) {

				setTimeout(function() {
					expect(loggerSuccessSpy.called).to.be.true;
					done();
				}, 0);
			});

			it('should have 2 workouts', function(done) {

				setTimeout(function() {
					expect(controller.workouts).to.have.lengthOf(2);
					done();
				}, 0);
			});

			it('should be loaded', function(done) {

				setTimeout(function() {
					expect(controller.loaded).to.be.true;
					done();
				}, 0);
			});

		});

		describe('showAddWorkoutForm', function() {

			beforeEach(function(done) {

				setTimeout(function() {
					mdDialogShowStub = sinon.stub($mdDialog, 'show');
					insertWorkoutStub = sinon.stub(dataService, 'insertWorkout');
					
					mdDialogShowStub.resolves(mockData.getWorkout().data);
					insertWorkoutStub.resolves({
						status: 'success',
						data: {
							id: 1
						}
					});

					$rootScope.$apply();
					done();
				}, 0);
			});

			it('should be defined', function() {

				expect(controller.showAddWorkoutForm).to.not.be.undefined;
			});

			it('should call $mdDailog.show', function(done) {

				controller.showAddWorkoutForm();
				setTimeout(function() {
					expect(mdDialogShowStub.firstCall.args[0].controller).to.be.equal('WorkoutFormController');
					expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.be.equal('app/workout/workout.form.html');
					done();
				}, 0);
			});

			it('should return and try to insert workout', function(done) {

				controller.showAddWorkoutForm();
				setTimeout(function() {
					expect(insertWorkoutStub.firstCall).to.not.be.undefined;
					expect(loggerSuccessSpy.called).to.be.true;
					expect(controller.workouts).to.have.lengthOf(3);
					done();
				}, 0);

			});

		});

		describe('removeWorkout', function() {

			beforeEach(function(done) {
				
				setTimeout(function() {
					removeWorkoutStub = sinon.stub(dataService, 'removeWorkout');
					
					removeWorkoutStub.resolves({
						status: 'success'
					});

					$rootScope.$apply();
					done();
				}, 0);
			});

			it('should be defined', function() {

				expect(controller.removeWorkout).to.not.be.undefined;
			});

			it('should remove workout', function(done) {

				controller.removeWorkout(0);
				setTimeout(() => {
					expect(removeWorkoutStub.firstCall).to.not.be.undefined;
					expect(loggerSuccessSpy.called).to.be.true;
					expect(controller.workouts).to.have.lengthOf(1);
					done();
				});

			});

		});

	});

});
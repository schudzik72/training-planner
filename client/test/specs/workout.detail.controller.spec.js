'use strict';
describe('trainingPlanner.workout', function() {

	let controller;

	let deferred;

	let mdDialogShowStub;
	let getWorkoutStub;
	let getWorkoutParametersStub;
	let getWorkoutExercisesStub;
	let updateWorkoutStub;
	let insertExerciseStub;
	let updateExerciseStub;
	let removeExerciseStub;
	let insertParameterStub;
	let updateParameterStub;
	let removeParameterStub;

	let loggerInfoSpy;
	let loggerSuccessSpy;

	beforeEach(function() {

		bard.appModule('trainingPlanner.workout');
		bard.inject('$controller', '$rootScope', '$q', 'logger', '$mdDialog', 'dataService');
	
	}); 

	beforeEach(function() {

		getWorkoutStub = sinon.stub(dataService, 'getWorkout');
		getWorkoutParametersStub = sinon.stub(dataService, 'getWorkoutParameters');
		getWorkoutExercisesStub = sinon.stub(dataService, 'getWorkoutExercises');
		mdDialogShowStub = sinon.stub($mdDialog, 'show');

		deferred = $q.defer();

		getWorkoutStub.resolves(mockData.getWorkout());
		getWorkoutParametersStub.resolves(mockData.getWorkoutParameters());
		getWorkoutExercisesStub.resolves(mockData.getExercises());

		loggerInfoSpy = sinon.spy(logger, 'info');
		loggerSuccessSpy = sinon.spy(logger, 'success');

		controller = $controller('WorkoutDetailController');
		$rootScope.$apply();
	});

	describe('WorkoutListController', function() {
		
		it('should be defined', function() {
			expect(controller).to.not.be.undefined;
		});

		describe('initialization', function() {

			it('should be loaded', function(done) {

				setTimeout(function() {
					expect(controller.loaded).to.be.true;
					done();
				}, 0);
			});

			it('should have editing name disabled', function() {

				expect(controller.editWorkoutName).to.be.false;
			});

			it('should have workout defined', function(done) {
				setTimeout(function() {

					expect(controller.workout).to.not.be.undefined;
					expect(controller.workout.id).to.be.equal(mockData.getWorkout().data.id);
					done();
				}, 0);
			});

			it('should have parameters', function(done) {

				setTimeout(function() {
					expect(controller.parameters).to.not.be.undefined;
					expect(controller.parameters).to.have.lengthOf(2);
					done();
				}, 0);
			});

			it('should have exercises', function(done) {

				setTimeout(function() {
					expect(controller.exercises).to.not.be.undefined;
					expect(controller.exercises).to.have.lengthOf(4);
					done();
				}, 0);
			});

			it('has chart defined', function(done) {

				setTimeout(function() {
					expect(controller.chart).to.not.be.undefined;
					expect(controller.chart.labels).to.have.lengthOf(7);
					done();
				}, 0);
			});

			describe('showAddExerciseForm', function() {

				beforeEach(function(done) {

					setTimeout(function() {
						insertExerciseStub = sinon.stub(dataService, 'insertExercise');
						
						controller.workout.id = 1;
						let exercise = angular.copy(mockData.getExercise().data);
						exercise.bodyPartsEngaged = exercise.bodyPartsEngaged.split(',');
						
						mdDialogShowStub.resolves(exercise);
						insertExerciseStub.resolves({
							status: 'success',
							data: exercise
						});
						
						$rootScope.$apply();
						done();
					});
				});
			
				it('should be defined', function() {

					expect(controller.showAddExerciseForm).not.to.be.undefined;
				});

				it('should open exercise form', function(done) {

					setTimeout(function() {
						controller.showAddExerciseForm(null);
						expect(mdDialogShowStub.firstCall).to.not.be.undefined;
						expect(mdDialogShowStub.firstCall.args[0].controller).to.be.equal('ExerciseFormController');
						expect(mdDialogShowStub.firstCall.args[0].locals).to.not.be.undefined;
						expect(mdDialogShowStub.firstCall.args[0].locals.workoutId).to.be.equal(mockData.getWorkout().data.id);
						expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.be.equal('app/exercise/exercise.form.html');
						done();
					}, 0);
				});

				it('should insert exercise', function(done) {

					controller.showAddExerciseForm(null);
					setTimeout(function() {
						expect(controller.exercises).to.have.lengthOf(5);
						done();
					});
				});

				it('should call logger success', function(done) {

					controller.showAddExerciseForm(null);
					setTimeout(function() {
						expect(loggerSuccessSpy.called).to.be.true;
						done();
					});
				});

			});

			describe('updateWorkout', function() {
				
				beforeEach(function(done) {

					setTimeout(function() {
						updateWorkoutStub = sinon.stub(dataService, 'updateWorkout');

						let updatedWorkout = angular.copy(mockData.getWorkout().data);
						updatedWorkout.name = 'Test';
						controller.editWorkoutName = true;
						controller.editWorkoutDescription = true;
						controller.updatedWorkout = updatedWorkout;
						
						updateWorkoutStub.resolves(mockData.getWorkout());

						$rootScope.$apply();
						done();
					}, 0);
				});

				it('should be defined', function() {

					expect(controller.updateWorkout).to.not.be.undefined;
				});

				it('should update controller workout', function(done) {

					controller.updateWorkout();
					setTimeout(function() {
						expect(controller.workout.name).to.equal('Test');
						done();
					}, 0);
				});

				it('should call logger success', function(done) {

					controller.updateWorkout();
					setTimeout(function() {
						expect(loggerSuccessSpy.called).to.be.true;
						done();
					}, 0);
				});

				it('should disable editing controls', function(done) {

					controller.updateWorkout();
					setTimeout(function() {
						expect(controller.editWorkoutName).to.be.false;
						expect(controller.editWorkoutDescription).to.be.false;
						done();
					}, 0);
				});

			});

			describe('cancelWorkoutUpdate', function() {
				
				beforeEach(function(done) {

					setTimeout(function() {
						let updatedWorkout = angular.copy(mockData.getWorkout().data);
						updatedWorkout.name = 'Test';
						controller.editWorkoutName = true;
						controller.editWorkoutDescription = true;
						controller.updatedWorkout = updatedWorkout;

						done();
					}, 0);
				});

				it('should be defined', function() {

					expect(controller.cancelWorkoutUpdate).to.not.be.undefined;
				});

				it('should disable editing controls', function(done) {

					controller.cancelWorkoutUpdate();
					setTimeout(function() {
						expect(controller.updatedWorkout.name).to.equal(mockData.getWorkout().data.name);
						done();
					}, 0);
				});

				it('should revert changes in updated workout model', function(done) {

					controller.cancelWorkoutUpdate();
					setTimeout(function() {
						expect(controller.editWorkoutName).to.be.false;
						expect(controller.editWorkoutDescription).to.be.false;
						done();
					}, 0);
				});

			});

			describe('showEditExerciseForm', function() {

				beforeEach(function(done) {

					setTimeout(function() {
						updateExerciseStub = sinon.stub(dataService, 'updateExercise');

						let exercise = angular.copy(mockData.getExercises().data[0]);
						exercise.bodyPartsEngaged = exercise.bodyPartsEngaged.split(',');
						exercise.name = 'Test';

						mdDialogShowStub.resolves(exercise);
						updateExerciseStub.resolves({
							status: 'success',
							data: exercise
						});

						$rootScope.$apply();
						done();
					}, 0);
				});

				it('should be defined', function() {

					expect(controller.showEditExerciseForm).to.not.be.undefined;
				});

				it('should call $mdDialog show and open exercise form', function(done) {

					controller.showEditExerciseForm(null, 0);
					setTimeout(function() {
						expect(mdDialogShowStub.firstCall).to.not.be.undefined;
						expect(mdDialogShowStub.firstCall.args[0].controller).to.equal('ExerciseFormController');
						expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.equal('app/exercise/exercise.form.html');
						expect(mdDialogShowStub.firstCall.args[0].locals.exercise.id).to.equal(mockData.getExercises().data[0].id);
						done();
					}, 0);
				});

				it('should updateExercise', function(done) {
					
					controller.showEditExerciseForm(null, 0);
					setTimeout(function() {
						expect(controller.exercises[0].name).to.equal('Test');
						done();
					}, 0);
				});

				it('should call logger success', function(done) {
					
					controller.showEditExerciseForm(null, 0);
					setTimeout(function() {
						expect(loggerSuccessSpy.called).to.be.true;
						done();
					}, 0);
				});

			});

			describe('removeExercise', function() {

				beforeEach(function(done) {

					setTimeout(function() {
						removeExerciseStub = sinon.stub(dataService, 'removeExercise');
						removeExerciseStub.resolves({
							status: 'success'
						});
						$rootScope.$apply();
						done();
					}, 0);
				});

				it('should be defined', function() {
					
					expect(controller.removeExercise).to.not.be.undefined;
				});

				it('should remove exercise', function(done) {
					
					controller.removeExercise(0);
					setTimeout(function() {
						expect(controller.exercises).to.have.lengthOf(3);
						done();
					}, 0);
				});

				it('should call logger success', function(done) {

					controller.removeExercise(0);
					setTimeout(function() {
						expect(loggerSuccessSpy.called).to.be.true;
						done();
					}, 0);
				});

			});

			describe('showParameterForm', function() {

				beforeEach(function(done) {

					setTimeout(function() {
						insertParameterStub = sinon.stub(dataService, 'insertParameter');

						mdDialogShowStub.resolves({
							parameter: mockData.getParameter().data
						});
						insertParameterStub.resolves(mockData.getParameter());

						$rootScope.$apply();
						done();
					}, 0);
				});

				it('should be defined', function() {

					expect(controller.showParameterForm).to.not.be.undefined;
				});

				it('should call $mdDialog show method', function(done) {

					controller.showParameterForm(null);
					setTimeout(function() {
						expect(mdDialogShowStub.firstCall).to.not.be.undefined;
						expect(mdDialogShowStub.firstCall.args[0].controller).to.equal('ParameterFormController');
						expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.equal('app/parameter/parameter.form.html');
						done();
					}, 0);
				});

				it('should insert parameter', function(done) {

					controller.showParameterForm(null);
					setTimeout(function() {
						expect(controller.parameters).to.have.lengthOf(3);
						done();
					}, 0);
				});

				it('should call logger success method', function(done) {

					controller.showParameterForm(null);
					setTimeout(function() {
						expect(loggerSuccessSpy.called).to.be.true;
						done();
					}, 0);
				});

			});

			describe('showEditParameterForm', function() {

				describe('delete', function() {

					beforeEach(function(done) {

						setTimeout(function() {
							removeParameterStub = sinon.stub(dataService, 'removeParameter');
							
							mdDialogShowStub.resolves({
								parameter: mockData.getWorkoutParameters().data[0],
								toDelete: true
							});
							removeParameterStub.resolves({
								status: 'success',
								data: mockData.getWorkoutParameters().data[0]
							});

							$rootScope.$apply();
							done();
						}, 0);
					});

					it('should call $mdDialog show method', function(done) {

						controller.showEditParameterForm(null, 0);
						setTimeout(function() {
							expect(mdDialogShowStub.firstCall).to.not.be.undefined;
							expect(mdDialogShowStub.firstCall.args[0].controller).to.equal('ParameterFormController');
							expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.equal('app/parameter/parameter.form.html');
							done();
						});
					});

					it('should remove parameter', function(done) {

						controller.showEditParameterForm(null, 0);
						setTimeout(function() {
							expect(controller.parameters).to.have.lengthOf(1);
							done();
						});
					});

					it('should call logger success method', function(done) {

						controller.showEditParameterForm(null, 0);
						setTimeout(function() {
							expect(loggerSuccessSpy.called).to.be.true;
							done();
						});
					});

				});

				describe('update', function() {

					beforeEach(function(done) {

						setTimeout(function() {
							updateParameterStub = sinon.stub(dataService, 'updateParameter');
							
							let parameter = mockData.getWorkoutParameters().data[0];
							parameter.name = 'Test';
							mdDialogShowStub.resolves({
								parameter: parameter,
								toDelete: false
							});
							updateParameterStub.resolves({
								status: 'success',
							});

							$rootScope.$apply();
							done();
						}, 0);
					});

					it('should call $mdDialog show method', function(done) {

						controller.showEditParameterForm(null, 0);
						setTimeout(function() {
							expect(mdDialogShowStub.firstCall).to.not.be.undefined;
							expect(mdDialogShowStub.firstCall.args[0].controller).to.equal('ParameterFormController');
							expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.equal('app/parameter/parameter.form.html');
							done();
						});
					});

					it('should update parameter', function(done) {

						controller.showEditParameterForm(null, 0);
						setTimeout(function() {
							expect(controller.parameters[0].name).to.equal('Test');
							done();
						});
					});

					it('should call logger success method', function(done) {

						controller.showEditParameterForm(null, 0);
						setTimeout(function() {
							expect(loggerSuccessSpy.called).to.be.true;
							done();
						});
					});

				});

				it('should be defined', function() {

					expect(controller.showEditParameterForm).to.not.be.undefined;
				});

			});
 
		});

	});

});
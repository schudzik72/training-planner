'use strict';
describe('trainingPlanner.exercise', function() {

	let controller;

	let loggerErrorSpy;
	let mdDialogHideStub;
	let getExerciseTypesStub;

	beforeEach(function() {

		bard.appModule('trainingPlanner.exercise');
		bard.inject('$controller', '$rootScope', 'logger', 'dataService', '$mdDialog');
	
	}); 

	beforeEach(function() {

		loggerErrorSpy = sinon.spy(logger, 'error');
		mdDialogHideStub = sinon.stub($mdDialog, 'hide');
		getExerciseTypesStub = sinon.stub(dataService, 'getExerciseTypes');

		getExerciseTypesStub.resolves(mockData.getExerciseTypes());

		controller = $controller('ExerciseFormController');
		$rootScope.$apply();
	});

	describe('ExerciseFormController', function() {

		beforeEach(function() {
			controller.exercise = mockData.getExercise().data;
			controller.isEdit = true;
			controller.workoutId = 1;
		});
		
		it('should be defined', function() {

			expect(controller).to.not.be.undefined;
		});

		it('should have parameter object defined', function() {

			expect(controller.exercise).to.not.be.undefined;
		});

		describe('upsert', function() {

			it('should be defined', function() {
				expect(controller.upsert).to.not.be.undefined;
			});

			it('should verify form and call $mdDialog.hide', function() {

				controller.upsert({
					$valid: true
				});
				expect(mdDialogHideStub.firstCall).to.not.be.undefined;
				expect(mdDialogHideStub.firstCall.args[0].id).to.equal(controller.exercise.id);
			});

			it('should verify form is invalid and call logger error', function() {
				
				controller.upsert({
					$valid: false
				});
				expect(loggerErrorSpy.called).to.be.true;
			});

		});

	});

});
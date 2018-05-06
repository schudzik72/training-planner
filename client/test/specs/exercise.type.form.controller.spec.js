'use strict';
describe('trainingPlanner.exercise', function() {

	let controller;

	let loggerErrorSpy;
	let mdDialogHideSpy;

	beforeEach(function() {

		bard.appModule('trainingPlanner.exercise');
		bard.inject('$controller', '$rootScope', 'logger', '$mdDialog');
	
	}); 

	beforeEach(function() {

		loggerErrorSpy = sinon.spy(logger, 'error');
		mdDialogHideSpy = sinon.spy($mdDialog, 'hide');

		controller = $controller('ExerciseTypeFormController');
		$rootScope.$apply();
	});

	describe('ExerciseTypeFormController', function() {
		
		it('should be defined', function() {

			expect(controller).to.not.be.undefined;
		});

		it('should have exerciseType object defined', function() {

			expect(controller.exerciseType).to.not.be.undefined;
		});

		describe('insert', function() {

			it('should be defined', function() {
				expect(controller.insert).to.not.be.undefined;
			});

			it('should verify form and call $mdDialog.hide', function() {

				controller.insert({
					$valid: true
				});
				expect(mdDialogHideSpy.called).to.be.true;
			});

			it('should verify form is invalid and call logger error', function() {
				
				controller.insert({
					$valid: false
				});
				expect(loggerErrorSpy.called).to.be.true;
			});

		});

	});

});
'use strict';
describe('trainingPlanner.workout', function() {

	let controller;
	let mocks = {};

	let loggerErrorSpy;
	let mdDialogHideSpy;

	beforeEach(function() {

		bard.appModule('trainingPlanner.workout');
		bard.inject('$controller', '$rootScope', 'logger', '$mdDialog');
	
	}); 

	beforeEach(function() {

		loggerErrorSpy = sinon.spy(logger, 'error');
		mdDialogHideSpy = sinon.spy($mdDialog, 'hide');

		controller = $controller('WorkoutFormController');
		$rootScope.$apply();
	});

	describe('WorkoutFormController', function() {
		
		it('should be defined', function() {
			expect(controller).to.not.be.undefined;
		});

		it('should have workout object defined', function() {
			expect(controller.workout).to.not.be.undefined;
		});

		describe('add', function() {
			it('should verify form and call $mdDialog.hide', function() {
				controller.add({
					$valid: true
				});
				expect(mdDialogHideSpy.called).to.be.true;
			});

			it('should verify form is invalid and call logger error', function() {
				controller.add({
					$valid: false
				});
				expect(loggerErrorSpy.called).to.be.true;
			});
		});

	});

});
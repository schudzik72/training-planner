'use strict';
describe('trainingPlanner.parameter', function() {

	let controller;
	let mocks = {};

	let loggerErrorSpy;
	let mdDialogHideStub;

	beforeEach(function() {

		bard.appModule('trainingPlanner.parameter');
		bard.inject('$controller', '$rootScope', 'logger', '$mdDialog');
	
	}); 

	beforeEach(function() {

		loggerErrorSpy = sinon.spy(logger, 'error');
		mdDialogHideStub = sinon.stub($mdDialog, 'hide');

		controller = $controller('ParameterFormController');
		$rootScope.$apply();
	});

	describe('ParameterFormController', function() {

		beforeEach(function() {
			controller.parameter = {
				id: 1,
				name: 'Test',
				value: 'Test'
			};
			controller.isEdit = true;
		});
		
		it('should be defined', function() {

			expect(controller).to.not.be.undefined;
		});

		it('should have parameter object defined', function() {

			expect(controller.parameter).to.not.be.undefined;
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
				expect(mdDialogHideStub.firstCall.args[0].toDelete).to.be.false;
				expect(mdDialogHideStub.firstCall.args[0].parameter.id).to.equal(controller.parameter.id);
			});

			it('should verify form is invalid and call logger error', function() {
				
				controller.upsert({
					$valid: false
				});
				expect(loggerErrorSpy.called).to.be.true;
			});

		});

		describe('remove', function() {

			it('should be defined', function() {

				expect(controller.remove).to.not.be.undefined;
			});

			it('should hide a dialog', function() {

				controller.remove();
				expect(mdDialogHideStub.firstCall).to.not.be.undefined;
				expect(mdDialogHideStub.firstCall.args[0].toDelete).to.be.true;
				expect(mdDialogHideStub.firstCall.args[0].parameter.id).to.equal(controller.parameter.id);
			});

		});

	});

});
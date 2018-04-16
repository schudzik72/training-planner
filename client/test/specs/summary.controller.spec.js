'use strict';
describe('trainingPlanner.summary', function() {
	let controller;
	let mocks = {};

	let getUserSpy;
	let loggerSuccessSpy;

	beforeEach(function() {
		mocks = {
			user: mockData.getUser
		};
		
		bard.appModule('trainingPlanner.summary');
		bard.inject('$controller', '$rootScope', '$q', 'logger', 'dataService');
	});

	beforeEach(function() {
		getUserSpy = sinon.spy(dataService, 'getUser');
		loggerSuccessSpy = sinon.spy(logger, 'success');

		controller = $controller('SummaryController');
		$rootScope.$apply();
	});

	describe('SummaryController', function() {
		it('should be created successfuly', function() {
			assert.isDefined(controller, 'controller is defined');
		});

		it('should call getUser', function() {
			expect(getUserSpy.called).to.be.true;
		});

		it('should be loaded', function() {
			expect(controller.loaded).to.be.true;
			expect(loggerSuccessSpy.called).to.be.true;
		});

	});

    bard.verifyNoOutstandingHttpRequests();

});
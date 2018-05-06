'use strict';
describe('trainingPlanner.layout', function() {

	let controller;

	let routerHelperGetStatesStub;

	beforeEach(function() {

		bard.appModule('trainingPlanner.layout');
		bard.inject('$controller', '$rootScope', '$state', 'routerHelper');	

		$state.title = 'Summary';
		$state.current = {
			title: 'Summary'
		};
	}); 

	beforeEach(function() {

		routerHelperGetStatesStub = sinon.stub(routerHelper, 'getStates');
		routerHelperGetStatesStub.returns(mockData.getStates());

		controller = $controller('SidenavController');
		$rootScope.$apply();
	});

	describe('SidenavController', function() {
		
		it('should be defined', function() {

			expect(controller).to.not.be.undefined;
		});

		describe('initialization', function() {

			it('should call routerHelper getStates method', function() {

				expect(routerHelperGetStatesStub.firstCall).to.not.be.undefined;
			});

		});

		describe('isCurrent', function() {

			it('should have isCurrent defined', function() {

				expect(controller.isCurrent).to.not.be.undefined;
			});

			it('should return current', function() {

				expect(controller.isCurrent({
					title: 'Summary',
				})).to.equal('current');
			});

		});


	});

});
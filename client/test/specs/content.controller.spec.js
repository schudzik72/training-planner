'use strict';
describe('trainingPlanner.layout', function() {

	let controller;

	let mdSidenavToggleSpy;

	beforeEach(function() {


		mdSidenavToggleSpy = sinon.spy();
		bard.appModule('trainingPlanner.layout', function($provide) {
			$provide.value('$mdSidenav', function(value) {
				return {
					toggle: mdSidenavToggleSpy
				};
			});
		});
		bard.inject('$controller', '$rootScope', '$mdSidenav');
	
	}); 

	beforeEach(function() {

		controller = $controller('ContentController');
		$rootScope.$apply();
	});

	describe('ContentController', function() {
		
		it('should be defined', function() {

			expect(controller).to.not.be.undefined;
		});

		describe('toggleSidenav', function() {

			it('should be defined', function() {

				expect(controller.toggleSidenav).to.not.be.undefined;
			});

			it('should call form $mdSidenav toggle method', function() {

				controller.toggleSidenav();
				expect(mdSidenavToggleSpy.called).to.be.true;
			});

		});

	});

});
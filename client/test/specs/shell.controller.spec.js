'use strict';
describe('trainingPlanner.layout', function() {

	let controller;

	beforeEach(function() {

		bard.appModule('trainingPlanner.layout');
		bard.inject('$controller', '$rootScope');	
	}); 

	beforeEach(function() {

		controller = $controller('ShellController');
		$rootScope.$apply();
	});

	describe('ShellController', function() {
		
		it('should be defined', function() {

			expect(controller).to.not.be.undefined;
		});

	});

});
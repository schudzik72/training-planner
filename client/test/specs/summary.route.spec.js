'use strict'
describe('summary.route', function() {

	let view = 'app/summary/summary.html';

	beforeEach(function() {

		bard.asyncModule('trainingPlanner.summary');
		bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
	});

	beforeEach(function() {

		$templateCache.put(view, '');
	});

	it('should map summary state route to summary url', function() {

		expect($state.href('summary', {})).to.equal('#!/summary');
	});

	it('should map summary state to the summary view', function() {
		
		expect($state.get('summary').templateUrl).to.equal(view);
	});

	it('should map default state to the summary url', function() {
		
		expect($state.href('default', {})).to.equal('#!');
	});

	it('should map default state to the summary view', function() {
		
		expect($state.get('default').templateUrl).to.equal(view);
	});

	it('should change state to default', function() {
		
		$state.go('default');
		$rootScope.$apply();
		expect($state.is('default'));
	})

	it('should change state to summary', function() {
		
		$state.go('summary');
		$rootScope.$apply();
		expect($state.is('summary'));
	});

});
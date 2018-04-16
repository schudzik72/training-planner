'use strict'
describe('workout.route', function() {

	let abstractView = 'app/workout/workout.html';
	let listView = 'app/workout/workout.list.html';
	let detailView = 'app/workout/workout.detail.html';

	let mocks;
	beforeEach(function() {
		mocks = {
			workout: mockData.getWorkout
		};
		bard.asyncModule('trainingPlanner.workout');
		bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
	});

	beforeEach(function() {
		$templateCache.put(abstractView, '');
	});

	it('should map workout.list state to the workouts list url', function() {
		expect($state.href('workout.list', {})).to.equal('#!/workouts/list');
	});

	it('should map workout.list state to the workouts list view', function() {
		expect($state.get('workout.list').templateUrl).to.equal(listView);
	});

	it('should map workout.list state to the workouts list url', function() {
		expect($state.href('workout.detail', {
			id: '1',
		})).to.equal('#!/workouts/detail/1');
	});

	it('should map workout.list state to the workouts list view', function() {
		expect($state.get('workout.detail').templateUrl).to.equal(detailView);
	});

	it('should change state to workout.list', function() {
		$state.go('workout.list');
		$rootScope.$apply();
		expect($state.is('workout.list'));
	});

	it('should change state to workout.detail', function() {
		$state.go('workout.detail', {
			id: '1'
		});
		$rootScope.$apply();
		expect($state.is('workout.detail'));
	});

});
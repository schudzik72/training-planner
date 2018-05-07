'use strict';
describe('trainingPlanner.exercise', function() {

	let controller;

	let getExerciseTypesStub;
	let insertExerciseTypeStub;
	let removeExerciseTypeStub;
	let loggerInfoSpy;
	let loggerSuccessSpy;
	let mdDialogShowStub;

	beforeEach(function() {

		bard.appModule('trainingPlanner.exercise');
		bard.inject('$controller', '$rootScope', '$q', 'logger', '$mdDialog', 'dataService');
	
	}); 

	beforeEach(function() {

		getExerciseTypesStub = sinon.stub(dataService, 'getExerciseTypes');

		
		getExerciseTypesStub.resolves(mockData.getExerciseTypes());

		loggerInfoSpy = sinon.spy(logger, 'info');
		loggerSuccessSpy = sinon.spy(logger, 'success');

		controller = $controller('ExerciseTypeListController');
		$rootScope.$apply();
	});

	describe('ExerciseTypeListController', function() {
		
		it('should be defined', function() {
			
			expect(controller).to.not.be.undefined;
		});

		describe('after init', function() {

			it('should be loaded', function(done) {

				setTimeout(function() {
					expect(controller.loaded).to.be.true;
					done();
				}, 0);
			});

			it('should call logger success', function(done) {

				setTimeout(function() {

					expect(loggerSuccessSpy.called).to.be.true;
					done();
				}, 0);
			});

			it('should have 2 exercise type', function(done) {

				setTimeout(function() {

					expect(controller.exerciseTypes).to.have.lengthOf(2);
					done();
				}, 0);
			});

		});

		describe('showAddExerciseTypeForm', function() {

			beforeEach(function(done) {

				setTimeout(function() {
					mdDialogShowStub = sinon.stub($mdDialog, 'show');
					insertExerciseTypeStub = sinon.stub(dataService, 'insertExerciseType');

					mdDialogShowStub.resolves(mockData.getExerciseType().data);
					insertExerciseTypeStub.resolves(mockData.getExerciseType());

					$rootScope.$apply();
					done();
				}, 0);
			});

			it('should be defined', function() {

				expect(controller.showAddExerciseTypeForm).to.not.be.undefined;
			});

			it('should call $mdDailog show method', function(done) {

				controller.showAddExerciseTypeForm(null);
				setTimeout(function() {
					expect(mdDialogShowStub.firstCall).to.not.be.undefined;
					expect(mdDialogShowStub.firstCall.args[0].controller).to.be.equal('ExerciseTypeFormController');
					expect(mdDialogShowStub.firstCall.args[0].templateUrl).to.be.equal('app/exercise/exercise.type.form.html');
					done();
				}, 0);
			});

			it('should return and try to insert exercise type', function(done) {

				controller.showAddExerciseTypeForm(null);
				setTimeout(function() {
					expect(insertExerciseTypeStub.firstCall).to.not.be.undefined;
					expect(loggerSuccessSpy.called).to.be.true;
					expect(controller.exerciseTypes).to.have.lengthOf(3);
					done();
				}, 0);

			});

		});

		describe('removeExerciseType', function() {

			beforeEach(function(done) {
				
				setTimeout(function() {
					removeExerciseTypeStub = sinon.stub(dataService, 'removeExerciseType');

					removeExerciseTypeStub.resolves({
						status: 'success'
					});

					$rootScope.$apply();
					done();
				}, 0);
			});

			it('should be defined', function() {

				expect(controller.removeExerciseType).to.not.be.undefined;
			});

			it('should remove exercise type', function(done) {

				controller.removeExerciseType(0);
				setTimeout(() => {
					expect(removeExerciseTypeStub.firstCall).to.not.be.undefined;
					expect(loggerSuccessSpy.called).to.be.true;
					expect(controller.exerciseTypes).to.have.lengthOf(1);
					done();
				});

			});

		});

	});

});
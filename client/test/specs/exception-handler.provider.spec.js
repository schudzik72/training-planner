/* jshint -W117, -W030 */
describe('blocks.exception', function() {
    let mocks = {
        errorMessage: 'fake error',
        prefix: '[TEST]: '
    };

    beforeEach(function() {
        bard.appModule('blocks.exception');
        bard.inject('$rootScope', 'exceptionHandler');
    });

    describe('exceptionHandler', function() {

        it('should be defined', function() {
            assert.isDefined(exceptionHandler, 'exceptionHandler is defined');
        });

        it('should have configuration', function() {
            assert.isDefined(exceptionHandler.config, 'exceptionHandler has configuration ');
        });

        describe('with appErrorPrefix', function() {
            beforeEach(function() {
                exceptionHandler.config.appErrorPrefix = mocks.prefix;
            });

            it('should have exceptionHandler defined', function() {
                assert.isDefined(exceptionHandler, 'exceptionHandler is defined');
            });

            it('should have exceptionHandler\'s appErrorPrefix defined', function() {
                assert.isDefined(exceptionHandler.config.appErrorPrefix, 'appErrorPrefix is defined');
            });

            it('should have exceptionHandler\'s appErrorPrefix set properly', function() {
                expect(exceptionHandler.config.appErrorPrefix).to.equal(mocks.prefix);
            });

            it('should throw an error when forced', function() {
                expect(functionThatWillThrow).to.throw();
            });

            it('manual error is handled by decorator', function() {
                let exception;
                exceptionHandler.config.appErrorPrefix = mocks.prefix;
                try {
                    $rootScope.$apply(functionThatWillThrow);
                }
                catch (ex) {
                    exception = ex;
                    expect(ex.message).to.equal(mocks.prefix + mocks.errorMessage);
                }
            });
        });
    });

    function functionThatWillThrow() {
        throw new Error(mocks.errorMessage);
    }


    bard.verifyNoOutstandingHttpRequests();
});
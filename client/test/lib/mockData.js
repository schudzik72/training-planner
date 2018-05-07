/*jshint maxlen:120 */
/*jshint -W079 */
var mockData = (function() {
    return {
        user: getUser,
        getWorkouts: getWorkouts,
        getWorkout: getWorkout,
        getWorkoutExercises: getWorkoutExercises,
        getWorkoutParameters: getWorkoutParameters,
        getParameter: getParameter,
        getExerciseTypes: getExerciseTypes,
        getExerciseType: getExerciseType,
        getExercises: getExercises,
        getExercise: getExercise,
        getStates: getStates,
    };

    function getUser() {
        return {
            firstName: 'John',
            lastName: 'Doe',
            getName: function() {
                return this.firstName + ' ' + this.lastName
            },
            bodyType: 'endomorph',
            height: '1.81m',
            weight: '70kg',
        };
    }

    function getWorkouts() {
        return {
            status: 'success',
            data: [
                {
                    id: 1,
                    name: 'MASS',
                    description: 'Workout focused on gaining body mass'
                },
                {
                    id: 2,
                    name: 'Performance',
                    description: 'Workout focused on performance'
                }
            ]
        };
    }

    function getWorkout() {
        return {
            status: 'success',
            data: {
                id: 1,
                name: 'Mass',
                description: 'Workout focused on gaining body mass'
            }
        };
    }

    function getWorkoutExercises() {
        return {
            status: 'success',
            data: [
                {
                    id: 1,
                    name: 'Chest press',
                    description: 'test description',
                    exerciseTypeId: 1,
                    bodyPartsEngaged: 'CHEST,ABS,TRICEPS',
                    linkToExercise: 'http://abc.com',
                    workoutId: 1,
                },
                {
                    id: 2,
                    name: 'Dips',
                    description: 'test description',
                    exerciseTypeId: 2,
                    bodyPartsEngaged: 'ABS,CHEST,SHOULDER,TRICEPS',
                    linkToExercise: 'http://abc.com',
                    workoutId: 1,
                },
                
            ]
        };
    }

    function getWorkoutParameters() {
        return {
            status: 'success',
            data: [
                {
                    id: 1,
                    name: 'Sets',
                    value: '8-12',
                    workoutId: 1
                },
                {
                    id: 2,
                    name: 'Repetitions',
                    value: '3-4',
                    workoutId: 1
                }
            ]
        };
    }

    function getParameter() {
        return {
            status: 'success',
            data: {
                id: 1,
                name: 'Sets',
                value: '8-12',
                workoutId: 1
            },
        };
    }

    function getExerciseTypes() {
        return {
            status: 'success',
            data: [
                {
                    id: 1,
                    type: 'PUSH'
                },
                {
                    id: 2,
                    type: 'BODYWEIGHT'
                }
            ]
        };
    }

    function getExerciseType() {
        return {
            status: 'success',
            data: {
                id: 1,
                type: 'PUSH'
            }
        };
    }

    function getExercises() {
        return {
            status: 'success',
            data: [
                {
                    id: 1,
                    name: 'Chest press',
                    description: 'test description',
                    exerciseTypeId: 1,
                    bodyPartsEngaged: 'CHEST,ABS,TRICEPS',
                    linkToExercise: 'http://abc.com',
                    workoutId: 1,
                },
                {
                    id: 2,
                    name: 'Dips',
                    description: 'test description',
                    exerciseTypeId: 2,
                    bodyPartsEngaged: 'ABS,CHEST,SHOULDER,TRICEPS',
                    linkToExercise: 'http://abc.com',
                    workoutId: 1,
                },
                {
                    id: 3,
                    name: 'Pull ups',
                    description: '',
                    exerciseTypeId: 2,
                    bodyPartsEngaged: 'ABS,TRICEPS,UPPER BACK,LOWER BACK',
                    linkToExercise: 'http://abc.com',
                    workoutId: 1,
                },
                {
                    id: 4,
                    name: 'Chin ups',
                    description: '',
                    exerciseTypeId: 2,
                    bodyPartsEngaged: 'ABS,BICEPS,TRICEPS,UPPER BACK,LOWER BACK',
                    linkToExercise: 'http://abc.com',
                    workoutId: 1,
                },
            ]
        };
    }

    function getExercise() {
        return {
            status: 'success',
            data: {
                id: 1,
                name: 'Chest press',
                description: 'test description',
                exerciseTypeId: 1,
                bodyPartsEngaged: 'CHEST,ABS,TRICEPS',
                linkToExercise: 'http://abc.com',
                workoutId: 1,
            },
        };
    }

    function getStates() {
        return [
            {
                state: 'summary',
                config: {
                    url: '/summary',
                    templateUrl: 'app/summary/summary.html',
                    controller: 'SummaryController',
                    controllerAs: 'vm',
                    title: 'Summary',
                    settings: {
                        nav: 1,
                        content: 'Summary'
                    }
                }
            },
        ];
    }

})();
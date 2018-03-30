/*jshint maxlen:120 */
/*jshint -W079 */
var mockData = (function() {
    return {
        getWorkouts: getWorkouts,
        getWorkout: getWorkout,
        getWorkoutExercises: getWorkoutExercises,
        getWorkoutParameters: getWorkoutParameters,
        getExerciseTypes: getExerciseTypes,
        getExercises: getExercises,
        getBodyParts: getBodyParts,
    };

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

    }

    function getWorkoutParameters() {

    }

    function getExerciseTypes() {

    }

    function getExercises() {
        
    }
    
    function getBodyParts() {

    }

})();

'use strict';

class Exercise {
	/**
	 * Represents an exercise.
	 * @constructor
	 * @param {string} name - The name of exercise.
	 * @param {string} description - Description of exercise.
	 * @param {string} type - Type of exercise PUSH/PULL/BREAK etc.
	 * @param {Array<String>} bodyPartsEngaged - array of body parts engaged in the exercise
	 * e.g. ['chest', 'lower back', 'biceps'].
	 * @param {string} linkToExercise - (Optional) path to the content presenting the exercise
	 */
	constructor(id, name, description, type, bodyPartsEngaged, linkToExercise) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.bodyPartsEngaged = bodyPartsEngaged;
		this.linkToExercise = linkToExercise;
	}

	getEngagedBodyPartsToString() {
		return this.bodyPartsEngaged.join(', ');
	}
}
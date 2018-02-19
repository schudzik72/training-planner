
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
	 * @param {string} imgOrGifPath - (Optional) path to img or gif presenting the exercise
	 */
	constructor(id, name, description, type, bodyPartsEngaged, imgOrGifPath) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.bodyPartsEngaged = bodyPartsEngaged;
		this.imgOrGifPath = imgOrGifPath;
	}

	getEngagedBodyPartsToString() {
		return this.bodyPartsEngaged.join(', ');
	}
}
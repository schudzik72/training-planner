'use strict';

class Type {
	constructor(id, name, parameters, iconPath) {
		this.id = id;
		this.name = name;
		this.parameters = parameters;
		this.iconPath = iconPath === undefined ? 
			'img/icons/ic_fitness_center_black_24px.svg' : 
			iconPath;
	}
}
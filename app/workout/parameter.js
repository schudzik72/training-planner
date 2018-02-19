'use strict';

class Parameter {
	constructor(name, value) {
		this.name = name;
		this.value = value === undefined ?
			'' :
			value;
	}
}
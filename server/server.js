(function() {
	'use strict';

	let sqlite3 = require('sqlite3').verbose();
	let db = new sqlite3.Database('./training-planner.db');

	let express = require('express'),
		bodyParser = require('body-parser');

	let restApi = express();
	restApi.use(bodyParser.json());

	let JSendResponse = require('./jsend.response');

	restApi.use(function (request, response, next) {
	    // Website you wish to allow to connect
	    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
	    // Request methods you wish to allow
	    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	    // Request headers you wish to allow
	    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    response.setHeader('Access-Control-Allow-Credentials', true);
	    // Pass to next layer of middleware
	    next();
	});

	restApi.get('/workouts', 
		(request, response) => {
			db.all('SELECT * FROM WORKOUT',
				(error, rows) => {
					if(error) {
						response.send(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', rows));
					}
				});
		});
	restApi.get('/workouts/:id',
		(request, response) => {
			let id = request.params.id;
			db.get(`SELECT * FROM WORKOUT WHERE id = ${id}`,
				(error, row) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else if(row === undefined) {
						response.json(new JSendResponse('error', null, 'Not found'));
					} else {
						response.json(new JSendResponse('success', row));
					}
				});
		});
	restApi.post('/workouts',
		(request, response) => {
			let workout = request.body;
			db.run('INSERT INTO WORKOUT(name, description) VALUES(?, ?)', 
				[workout.name, workout.description],
				error => {
					let id = this.lastID;
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						workout.id = id;
						response.json(new JSendResponse('success', workout));
					}
				});
		});
	restApi.delete('/workouts/:id',
		(request, response) => {
			let workoutId = request.params.id;
			db.run('DELETE FROM WORKOUT WHERE id = ?',
				[workoutId],
				error => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success'));
					}
				});
		});

	restApi.get('/exercise-types', 
		(request, response) => {
			db.all('SELECT * FROM EXERCISE_TYPE',
				(error, rows) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', rows));
					}
				});
		});
	restApi.get('/exercise-types/:id',
		(request, response) => {
			let id = request.params.id;
			db.get(`SELECT * FROM EXERCISE_TYPE WHERE id = ${id}`,
				(error, row) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', row));
					}
				});
		});
	restApi.post('/exercise-types',
		(request, response) => {
			let type = request.body.type;
			db.run('INSERT INTO EXERCISE_TYPE(type) VALUES(?)',
				[type],
				error => {
					let id = this.lastID;
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						type.id = id;
						response.json(new JSendResponse('success', type));
					}
				});
		});
	restApi.delete('/exercise-types/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM EXERCISE_TYPE WHERE id = ${id}`,
				error => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success'));
					}
				});
		});

	restApi.get('/exercises',
		(request, response) => {
			db.all(`SELECT * FROM EXERCISE`,
				(error, rows) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', rows));
					}
				});
		});
	restApi.get('/exercises/:id',
		(request, response) => {
			let id = request.params.id;
			db.get(`SELECT * FROM EXERCISE WHERE id = ${id}`,
				(error, row) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', row));
					}
				});
		});
	restApi.delete('/exercises/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM EXERCISE WHERE id = ${id}`,
				(error) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success'));
					}
				});
		});
	restApi.get('/workouts/:id/exercises',
		(request, response) => {
			let id = request.params.id;
			db.all(`SELECT * FROM EXERCISE WHERE workoutId = ${id}`,
				(error, rows) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', rows));
					}
				});
		});
	restApi.post('/exercises',
		(request, response) => {
			let exercise = request.body;
			db.run(`INSERT INTO EXERCISE(name, description, exerciseTypeId, bodyPartsEngaged, linkToExercise, workoutId) VALUES(?, ?, ?, ?, ?, ?)`,
				[exercise.name, exercise.description, exercise.exerciseTypeId, exercise.bodyPartsEngaged, exercise.linkToExercise, exercise.workoutId],
				error => {
					let id = this.lastID;
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', exercise));
					}
				})
		});
	restApi.put('/exercises/:id',
		(request, response) => {
			let id = request.params.id;
			let exercise = request.body;
			db.run('UPDATE EXERCISE SET name = ?, description = ?, exerciseTypeId = ?, bodyPartsEngaged = ?, linkToExercise = ?, workoutId = ? WHERE id = ?',
				[exercise.name, exercise.description, exercise.exerciseTypeId, exercise.bodyPartsEngaged, exercise.linkToExercise, exercise.workoutId, id],
				error => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', exercise));
					}
				})
		})
	restApi.delete('/exercises/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM EXERCISE WHERE id = ${id}`,
				error => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success'));
					}
				});
		});

	restApi.get('/workouts/:id/parameters',
		(request, response) => {
			let id = request.params.id;
			db.all(`SELECT * FROM PARAMETER WHERE workoutId = ${id}`,
				(error, rows) => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', rows));
					}
				});
		});
	restApi.post('/workouts/:id/parameters',
		(request, response) => {
			let id = request.params.id;
			let parameter = request.body;
			db.run('INSERT INTO PARAMETER(name, value, workoutId) VALUES(?, ?, ?)',
				[parameter.name, parameter.value, id],
				error => {
					let id = this.lastID;
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', parameter));
					}
				});
		});
	restApi.put(`/parameters/:id`,
		(request, response) => {
			let id = request.params.id;
			let parameter = request.body;
			db.run('UPDATE PARAMETER SET name = ?, value = ? WHERE id = ?',
				[parameter.name, parameter.value, id],
				error => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success', parameter));
					}
				});
		});
	restApi.delete('/parameters/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM PARAMETER WHERE id = ${id}`,
				error => {
					if(error) {
						response.json(new JSendResponse('error', null, error));
					} else {
						response.json(new JSendResponse('success'));
					}
				});
		});

	restApi.listen(3000, () => console.log('Listening on port 3000'));

})();
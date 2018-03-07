(function() {
	'use strict';

	let sqlite3 = require('sqlite3').verbose();
	let db = new sqlite3.Database('./training-planner.db');

	let express = require('express'),
		bodyParser = require('body-parser');

	let restApi = express();
	restApi.use(bodyParser.json());

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
					console.log(error);
					console.log(rows);
					if(error) {
						response.send(error);
					} else {
						response.json(rows);
					}
				});
		});
	restApi.get('/workouts/:id',
		(request, response) => {
			let id = request.params.id;
			db.get(`SELECT * FROM WORKOUT WHERE id = ${id}`,
				(error, row) => {
					if(error) {
						console.log(error);
						response.status(500).json(error);
					} else if(row === undefined) {
						response.sendStatus(404);
					} else {
						response.json(row);
					}
				});
		});
	restApi.post('/workouts',
		(request, response) => {
			let workout = request.body;
			db.run('INSERT INTO WORKOUT(name, description) VALUES(?, ?)', 
				[workout.name, workout.description],
				function(error) {
					let id = this.lastID;
					if(error) {
						response.send(error);
					} else {
						response.status(201).json({
							id: id
						});
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
						response.send(error);
					} else {
						response.status(204).send('SUCCESS');
					}
				});
		});

	restApi.get('/exercise-types', 
		(request, response) => {
			db.all('SELECT * FROM EXERCISE_TYPE',
				(error, rows) => {
					if(error) {
						response.send(error);
					} else {
						response.json(rows);
					}
				});
		});
	restApi.get('/exercise-types/:id',
		(request, response) => {
			let id = request.params.id;
			db.get(`SELECT * FROM EXERCISE_TYPE WHERE id = ${id}`,
				(error, row) => {
					if(error) {
						response.status(404).send(error);
					} else {
						response.json(row);
					}
				});
		});
	restApi.post('/exercise-types',
		(request, response) => {
			let type = request.body.type;
			db.run('INSERT INTO EXERCISE_TYPE(type) VALUES(?)',
				[type],
				function(error) {
					let id = this.lastID;
					if(error) {
						console.log(error);
						response.send(error);
					} else {
						response.status(201).json({
							id: id
						});
					}
				});
		});
	restApi.delete('/exercise-types/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM EXERCISE_TYPE WHERE id = ${id}`,
				(error) => {
					if(error) {
						console.log(error);
						response.send(error);
					} else {
						response.statusStatus(204);
					}
				});
		});

	restApi.get('/exercises',
		(request, response) => {
			db.all(`SELECT * FROM EXERCISE`,
				(error, rows) => {
					if(error) {
						response.status(404).send(error);
					} else {
						response.json(rows);
					}
				});
		});
	restApi.get('/exercises/:id',
		(request, response) => {
			let id = request.params.id;
			db.get(`SELECT * FROM EXERCISE WHERE id = ${id}`,
				(error, row) => {
					if(error) {
						response.status(404).send(error);
					} else {
						response.json(row);
					}
				});
		});
	restApi.delete('/exercises/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM EXERCISE WHERE id = ${id}`,
				(error) => {
					if(error) {
						response.send(error);
					} else {
						response.sendStatus(204);
					}
				});
		});
	restApi.get('/workouts/:id/exercises',
		(request, response) => {
			let id = request.params.id;
			db.all(`SELECT * FROM EXERCISE WHERE workoutId = ${id}`,
				(error, rows) => {
					if(error) {
						response.status(404).send(error);
					} else {
						response.json(rows);
					}
				});
		});
	restApi.post('/exercises',
		(request, response) => {
			let exercise = request.body;
			db.run(`INSERT INTO EXERCISE(name, description, exerciseTypeId, bodyPartsEngaged, linkToExercise, workoutId) VALUES(?, ?, ?, ?, ?, ?)`,
				[exercise.name, exercise.description, exercise.exerciseTypeId, exercise.bodyPartsEngaged, exercise.linkToExercise, exercise.workoutId],
				function(error) {
					let id = this.lastID;
					if(error) {
						response.send(error);
					} else {
						response.status(201).json({
							id: id
						})
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
						response.send(error);
					} else {
						response.sendStatus(200);
					}
				})
		})
	restApi.delete('/exercises/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM EXERCISE WHERE id = ${id}`,
				error => {
					if(error) {
						response.send(error);
					} else {
						response.status(204).send('SUCCESS');
					}
				});
		});

	restApi.get('/workouts/:id/parameters',
		(request, response) => {
			let id = request.params.id;
			db.all(`SELECT * FROM PARAMETER WHERE workoutId = ${id}`,
				(error, rows) => {
					if(error) {
						response.status(404).send(error);
					} else {
						response.json(rows);
					}
				});
		});
	restApi.post('/workouts/:id/parameters',
		(request, response) => {
			let id = request.params.id;
			let parameter = request.body;
			db.run('INSERT INTO PARAMETER(name, value, workoutId) VALUES(?, ?, ?)',
				[parameter.name, parameter.value, id],
				function(error) {
					let id = this.lastID;
					if(error) {
						response.send(error);
					} else {
						response.status(201).json({
							id: id
						});
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
						response.send(error);
					} else {
						response.sendStatus(200);
					}
				});
		});
	restApi.delete('/parameters/:id',
		(request, response) => {
			let id = request.params.id;
			db.run(`DELETE FROM PARAMETER WHERE id = ${id}`,
				error => {
					if(error) {
						response.send(error);
					} else {
						response.status(204).send('SUCCESS');
					}
				});
		});

	restApi.listen(3000, () => console.log('Listening on port 3000'));

})();
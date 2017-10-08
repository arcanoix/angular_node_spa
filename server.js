//
//es nuestro fichero Node donde estará
// la configuración del servidor y las rutas a nuestro API
//

//server.js

var express = require('express');
var app = express();
var mongoose = require('mongoose');

//conexion con la base de datos
mongoose.connect('mongodb://localhost:27017/angular-todo');

//configuracion

app.configure(function() {
	//localizacion de los ficheros estaticos

	app.use(express.static(__dirname + 'public/'));
	// Muestra un log de todos los request en la consola
	app.use(express.logger('dev'));
	// Permite cambiar el HTML con el metodo POST
	app.use(express.bodyParser());
	//Simula DELETE y PUT
	app.use(express.methodOverride());
});

//Definicion de modelos
var Todo = mongoose.model('Todo', {
	text:String
});

// Rutas de nuestro API
//GET de todos los TODOS
app.get('/api/todos', function(req, res) {
	Todo.find(function(err, todos) {
		if(err) {
			res.send(err);
		}
		res.json(todos);
	});
});

// POST que crea un TODO y devuelve todos tras la creacion
app.post('/api/todos', function(req, res) {
	Todo.create({
		text:req.body.text,
		done:false
	}, function(err, todo) {
		if(err){
			res.send(err);
		}
	Todo.find(function(err, todos) {
		if(err){
			res.send(err);
		}
		res.json(todos);
		});	
	});
});

//Delete un TODO especifico y devuelve todos tras borrarlo.
app.delete('/api/todos/:todo', function(req, res) {
	Todo.remove({
		_id:req.params.todo
	}, function(err, todo) {
		if(err){
			res.send(err);
		}

		Todo.find(function(err, todos) {
			if(err){
				res.send(err);
			}
			res.json(todos);
		});
	})
});

//Carga una vista HTML simple donde ira nuestra single app page
//Angular manejara el frontend

app.get('*', function(req, res){
	res.sendfile('/public/index.html');
});

//escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App linstening on port 8080');
});


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

//escucha en el puerto 8080 y corre el server
app.listen(8080, function() {
	console.log('App linstening on port 8080');
});


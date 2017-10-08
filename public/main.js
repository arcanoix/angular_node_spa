/*
contendrá toda la lógica del frontend,
es donde tendremos los controladores de Angular JS y
llamaremos via AJAX al API para pedir contenido, borrarlo, etc..

*/

angular.module('angularTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// Cuando se cargue la pagina, pidel del API todos los TODOs
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data)
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// Cuando se añade un nuevo TODO, manda el texto a la APi
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData ={};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: '+ data);

			});
	};

	//Borra un TODO despues de checkearlo como acabado
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};	
}
let scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
    $scope.formData = {title: 'test', description: ''};

	// when landing on the page, get all todos and show them
	$scope.getPosts = function() {
        $http.get('/api/questions')
            .success(function(data) {
                $scope.todos = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
	};


	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/questions', $scope.formData)
			.success(function(data) {
                $scope.formData = {title: 'test', description: ''}; // clear the form so our user is ready to enter another
				$scope.getPosts();
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}

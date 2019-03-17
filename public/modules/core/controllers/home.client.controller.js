'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {
		// This provides Authentication context.
		$scope.formData = {content: ''};

		// when landing on the page, get all posts and show them
		$scope.getPosts = function() {
			$http.get('/api/posts')
				.then(function(data) {
					$scope.posts = data;
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};


		// when submitting the add form, send the text to the node API
		$scope.addPost = function() {
			$http.post('/api/posts', $scope.formData)
				.then(function(data) {
					$scope.formData = {content: ''}; // clear the form so our user is ready to enter another
					$scope.getPosts();
					console.log(data);
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};

		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$http.delete('/api/posts/' + id)
				.then(function(data) {
					$scope.posts = data;
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};
	}
]);
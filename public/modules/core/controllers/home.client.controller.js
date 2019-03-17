'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http',
	function($scope, $http) {
		// This provides Authentication context.
		$scope.formData = {content: ''};

		// when landing on the page, get all posts and show them
		$scope.getPosts = function() {
			$http.get('/api/posts')
				.then(function(response) {
					$scope.posts = response.data;
					console.log($scope.posts);
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};


		// when submitting the add form, send the text to the node API
		$scope.addPost = function() {
			$http.post('/api/posts', $scope.formData)
				.then(function(response) {
					$scope.formData = {content: ''}; // clear the form so our user is ready to enter another
					$scope.getPosts();
					console.log(response);
				})
				.catch(function(error) {
					console.log('Error: ' + error);
				});
		};

		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$http.delete('/api/posts/' + id)
				.then(function(response) {
					$scope.posts = response;
				})
				.catch(function(error) {
					console.log('Error: ' + error);
				});
		};
	}
]);
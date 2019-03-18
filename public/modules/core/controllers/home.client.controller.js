'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', '$cookies', '$window',
	function($scope, $http, $cookies, $window) {
		// This provides Authentication context.
		$scope.formData = {content: ''};

		$scope.curUser = JSON.parse($window.localStorage.getItem('user')).currentUser;
		console.log($scope.curUser);

		// when landing on the page, get all posts and show them
		$scope.getPosts = function() {
			$http.get('/api/posts/' + $scope.curUser.id)
				.then(function(response) {
					$scope.posts = response.data;
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};

		// get post reactions
		$scope.getPostReactions = function() {
			$http.get('/api/posts')
				.then(function(response) {
					$scope.posts = response.data;
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};


		// get post reactions
		$scope.getPostComments = function(postId) {
			console.log(postId);
			$http.get('/api/comments/' + postId)
				.then(function(response) {
					$scope.comments = response.data;
					console.log($scope.comments);
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};

		// when submitting the add form, send the text to the node API
		$scope.addPost = function() {
			if ($scope.formData.content === '') {
				alert("Empty input!");
			} else {
				$http.post('/api/posts', $scope.formData)
					.then(function(response) {
						$scope.formData = {content: ''}; // clear the form so our user is ready to enter another
						$scope.getPosts();
						console.log(response);
					})
					.catch(function(error) {
						console.log('Error: ' + error);
						alert(error);
					});
			}
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
'use strict';

angular.module('core').controller('HomeController', ['$scope', '$http', '$cookies', '$window',
	function($scope, $http, $cookies, $window) {
		// This provides Authentication context.

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
		$scope.getPostInteractions = function(postId) {
			$http.get('/api/interactions/' + postId)
				.then(function(response) {
					$scope.comments = response.data || 0;
					$scope.likesCount = response.data.likesCount || 0;
					$scope.dislikesCount = response.data.dislikesCount || 0;
				})
				.catch(function(data) {
					console.log('Error: ' + data);
				});
		};

		// when submitting the add form, send the text to the node API
		$scope.formData = {content: '', userId: $scope.curUser.id};

		$scope.addPost = function() {
			if ($scope.formData.content === '') {
				alert("Empty input!");
			} else {
				$http.post('/api/posts', $scope.formData)
					.then(function(response) {
						$scope.formData = {content: '', userId: $scope.curUser.id}; // clear the form so our user is ready to enter another
						$scope.getPosts();
						console.log(response);
					})
					.catch(function(error) {
						console.log('Error: ' + error);
						alert(error);
					});
			}
		};

		// when submitting the add form, send the text to the node API
		$scope.addComment = function(postId, userId, commentContent) {

            let commentData = {
				content: commentContent,
				userId: userId,
				postId: postId
			};
			$http.post('/api/createComment', commentData)
				.then(function (response) {
					$scope.curComment = "";
					$scope.getPosts();
					console.log(response);
				})
				.catch(function (error) {
					console.log('Error: ' + error);
					alert(error);
				});
		};

		// get user profiles
        $scope.getUserProfiles = function () {
            $http.get('/api/users')
                .then(function(response) {
                    $scope.users = response.data || [];
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        }

	}
]);
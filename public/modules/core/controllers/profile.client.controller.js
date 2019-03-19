'use strict';

angular.module('core').controller('ProfileController', ['$scope', '$http', '$cookies', '$window',
    function($scope, $http, $cookies, $window) {
        // This provides Authentication context.

        $scope.curUser = JSON.parse($window.localStorage.getItem('user')).currentUser;
        console.log($scope.curUser);

        $scope.getUserById = function (post) {
            $http.get('/api/user/' + post.user_id)
                .then(function(response) {
                    post.user = response.data;
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // when landing on the page, get all posts and show them
        $scope.getPosts = function() {
            $http.get('/api/userPosts/' + $scope.curUser.id)
                .then(function(response) {
                    $scope.posts = response.data;
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // get post reactions
        $scope.getPostComments = function(post) {
            $http.get('/api/interactions/' + post.id)
                .then(function(response) {
                    post.comments = response.data || [];
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        };

        // get post reaction stats
        $scope.getPostReactionStats = function(post) {
            $http.get('/api/likeCount/' + post.id)
                .then(function(response) {
                    post.likesCount = response.data.count || 0;
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });

            $http.get('/api/dislikeCount/' + post.id)
                .then(function(response) {
                    post.dislikesCount = response.data.count || 0;
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.likePost = function (post) {
            $http.post('/api/likePost', {postId: post.id, userId: $scope.curUser.id, type: 1})
                .then(function (response) {
                    $scope.getPostReactionStats(post);
                })
                .catch(function (error) {
                    console.log('Error: ' + error);
                    alert(error);
                });
        };

        $scope.dislikePost = function (post) {
            $http.post('/api/dislikePost', {postId: post.id, userId: $scope.curUser.id, type: 2})
                .then(function (response) {
                    $scope.getPostReactionStats(post);
                })
                .catch(function (error) {
                    console.log('Error: ' + error);
                    alert(error);
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
            $http.get('/api/friendsList/'+$scope.curUser.id)
                .then(function(response) {
                    $scope.users = response.data || [];
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        };

        $scope.getFollowerProfiles = function () {
            $http.get('/api/followers/'+$scope.curUser.id)
                .then(function(response) {
                    $scope.followers = response.data || [];
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        }

    }
]);
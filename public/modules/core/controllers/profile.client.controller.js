'use strict';

angular.module('core').controller('ProfileController', ['$scope', '$http', '$cookies', '$window',
    function($scope, $http, $cookies, $window) {
        // This provides Authentication context.

        $scope.curUser = JSON.parse($window.localStorage.getItem('user')).currentUser;
        console.log($scope.curUser);

        // when landing on the page, get all posts and show them
        $scope.getUserPosts = function() {
            $http.get('/api/posts/' + $scope.curUser.id)
                .then(function(response) {
                    $scope.posts = response.data;
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
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
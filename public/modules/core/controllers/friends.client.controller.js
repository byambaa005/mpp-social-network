'use strict';

angular.module('core').controller('FriendsController', ['$scope', '$http', '$cookies', '$window', '$stateParams',
    function($scope, $http, $cookies, $window, $stateParams) {
        // This provides Authentication context.

        let searchString = $stateParams.searchString;

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
        };

        // get user profiles
        if (searchString) {
            $http.get('/api/search/' + searchString)
                .then(function(response) {
                    console.log(response.data);
                    $scope.searchResults = response.data;
                    // $scope.users = response.data || [];
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        }
    }
]);
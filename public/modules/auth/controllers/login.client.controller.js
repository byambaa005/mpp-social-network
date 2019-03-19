'use strict';

angular.module('auth')

    .controller('LoginController',
        ['$scope', '$rootScope', '$location', 'AuthenticationService', '$http',
            function ($scope, $rootScope, $location, AuthenticationService, $http) {
                // reset login status
                // AuthenticationService.ClearCredentials();

                $scope.login = function () {
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.username, $scope.password, function(response) {

                        let userData = response.data;




                        if(response.status ===  200) {
                            $http.get('/api/user/' + userData.id)
                                .then(function(response) {
                                    AuthenticationService.SetCredentials(userData.id ,$scope.username, $scope.password, response.data.img);
                                    $location.path('/');
                                })
                                .catch(function(data) {
                                    console.log('Error: ' + data);
                                });
                        } else {
                            $scope.error = response.data.message;
                            $scope.dataLoading = false;
                        }
                    });
                };

                $scope.userSignUpData = {};

                $scope.userSignUp = function () {

                    $http.post('/api/signup', $scope.userSignUpData)
                        .then(function (response) {
                            alert('Successfully signed up!');
                            window.location = "/#!/login";
                        })
                        .catch(function(error) {
                            alert(error.data.message);
                        });

                    // let userData = response.data;
                    //
                    // if (response.status === 200) {
                    //     AuthenticationService.SetCredentials(userData.id, $scope.username, $scope.password);
                    //     $location.path('/');
                    // } else {
                    //     $scope.error = response.message;
                    //     $scope.dataLoading = false;
                    // }
                };
            }]);
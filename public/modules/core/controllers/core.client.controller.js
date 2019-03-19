'use strict';

angular.module('core').controller('CoreController', ['$scope', '$http', '$cookies', '$window', 'AuthenticationService', '$location', '$rootScope',
    function($scope, $http, $cookies, $window, AuthenticationService, $location, $rootScope) {

        $scope.userLoggedIn = function () {
            return (($window.localStorage.getItem('user') !== null) && $location.path() !== '/login' && $location.path() !== '/signup');
        };

        $scope.curUser = JSON.parse($window.localStorage.getItem('user')).currentUser;

        $scope.searchInput = "";
        $scope.searchUser = function (searchString) {
            console.log(searchString);
            $scope.searchInput = "";
            window.location = "/#!/friends/"+searchString;
        };

        // This provides Authentication context.
        $scope.signOut = function () {
            AuthenticationService.ClearCredentials();
            // alert("signed out!");
            window.location = "/#!/login";
        }

    }
]);

angular.module('core').directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                let msg = attr.ngConfirmClick || "Are you sure?";
                let clickAction = attr.confirmedClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        scope.$eval(clickAction)
                    }
                });
            }
        };
    }]);
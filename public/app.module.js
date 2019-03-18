'use strict';

// Define the `socialNetworkFp` module
angular.module('socialNetworkFp', ['ngCookies', 'ui.router' ,'core', 'auth'])

    .run(['$rootScope', '$location', '$cookies', '$http', '$window',
        function ($rootScope, $location, $cookies, $http, $window) {
            // keep user logged in after page refresh
            // $rootScope.globals = $cookies.get('globals') || {};
            $rootScope.globals = JSON.parse($window.localStorage.getItem('user')) || {};
            if ($rootScope.globals.currentUser) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            }

            // $rootScope.$on('$locationChangeStart', function (event, next, current) {
            //     console.log($location.path() !== '/login' && !$rootScope.globals.currentUser);
            //     // redirect to login page if not logged in
            //     if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
            //         $location.path('/login');
            //     }
            // });
        }]);

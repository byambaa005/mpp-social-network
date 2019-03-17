'use strict';

// Setting up route
angular.module('auth').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/login');

		// Home state routing
		$stateProvider.
		state('login', {
			url: '/login',
			controller: 'LoginController',
			templateUrl: 'modules/auth/views/login.template.html'
		});
	}
]);
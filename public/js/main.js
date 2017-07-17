(function(){
	'use strict';
	angular.module('smartlist',['ngRoute', 'ngResource'])
		.config(function($routeProvider, $httpProvider) {

			$httpProvider.interceptors.push('mainInterceptor');

			$routeProvider.when('/listas', {
				templateUrl: 'partials/listas.html',
				controller: 'ListasCtrl'
			});

			$routeProvider.when('/lista/:listaId', {
				templateUrl: 'partials/lista.html',
				controller: 'ListaCtrl'
			});

			$routeProvider.when('/lista', {
				templateUrl: 'partials/lista.html',
				controller: 'ListaCtrl'
			});

			$routeProvider.when('/auth', {
				templateUrl: 'partials/auth.html'
			});

			$routeProvider.otherwise({redirectTo: '/listas'});

		});
})();

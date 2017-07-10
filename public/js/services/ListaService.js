angular.module('smartlist').factory('Lista',
	
	function($resource) {
	
		return $resource('/listas/:id');
	
	});
angular.module('smartlist').factory('mainInterceptor', function($q, $location) {  

    var mainInterceptor = {
    	responseError: function(resposta) {
    		if (resposta.status == 401) {
    		  $location.path('/auth');
    		}
            return $q.reject(resposta);
    	}
    }

    return mainInterceptor;
});
(function() {
	
	'use strict';
	
	angular.module('smartlist').controller('ListasCtrl',ListasCtrl);

	ListasCtrl.$inject = ['Lista','$scope'];
	
	function ListasCtrl(Lista, $scope) {

			$scope.mensagem = {texto: ''};
			$scope.listas = [];
			$scope.filtro = '';

			$scope.buscaListas = buscaListas;
			$scope.remove = remove;
			$scope.init = init;

			function buscaListas() {
				console.log('buscaListas()');
				Lista.query(
						function(data) {
							$scope.listas = data;
							$scope.mensagem = {};
						},
						function(erro) {
							console.log(erro);
							$scope.mensagem = {texto : 'Não foi possível obter nenhuma lista.'};
						}
				);
			};

			function remove(lista) {
				if (confirm('Tem certeza que quer remover esta lista?')) {
					Lista.delete(
						{id: lista._id}, 
						buscaListas, 
						function(erro) {
							console.log(erro);
							$scope.mensagem = {texto : 'Não foi possível remover a lista.'};
						}
					);
				};
			};

			function init() {
				console.log('Inicializando app...');
				buscaListas();
			};

			init();
		}
})();
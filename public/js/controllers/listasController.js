angular.module('smartlist').controller('ListasCtrl',
	function($scope, Lista) {

		$scope.mensagem = {texto: ''};

		$scope.listas = [];

		$scope.filtro = '';

		function buscaListas() {
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

		$scope.remove = function(lista) {
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

		$scope.init = function() {
			buscaListas();
		};

		$scope.init();
	});
angular.module('smartlist').controller('ListaCtrl',
	function($scope, Lista, $routeParams) {
				
		if($routeParams.listaId) {
			Lista.get(
				{id: $routeParams.listaId}, 
				function(lista) {
					$scope.lista = lista;
				},
				function(erro) {
					$scope.mensagem = {texto: 'Não foi possível obter nenhuma lista.'};
					console.log(erro);
				}
			);
		} else {
			$scope.lista = new Lista();
		};

		$scope.salva = function() {
			$scope.lista.$save().then(function() {
				$scope.mensagem = {texto: 'Lista salva com sucesso'};
					// limpa o formulário
					$scope.lista = new Lista();
				})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar a lista'};
			});
		};

		Lista.query(function(listas) {
			$scope.listas = listas;
		});

});
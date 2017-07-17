(function(){

	'use strict';

	angular.module('smartlist').controller('ListaCtrl',	ListaCtrl);

	ListaCtrl.$inject = ['Lista', '$scope', '$routeParams'];

	function ListaCtrl(Lista, $scope, $routeParams) {

		$scope.login = document.getElementById('usuario-logado').innerHTML;
		$scope.tipos = ['Mercado', 'Tarefas'];
		$scope.addItem = addItem;
		$scope.salva = salva;
		$scope.removeItem = removeItem;

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
			$scope.lista.tipo = 'Mercado';
			$scope.lista.itens = [];
			$scope.lista.notificacoes = [];
		};

		function salva(lista) {
			$scope.lista.$save().then(function() {
				$scope.mensagem = {texto: 'Lista salva com sucesso'};
				Lista.get(
					{id: $scope.lista._id}, 
					function(lista) {
						$scope.lista = lista;
					},
					function(erro) {
						$scope.mensagem = {texto: 'Não foi possível obter nenhuma lista.'};
						console.log(erro);
					}
				);
			})
			.catch(function(erro) {
				$scope.mensagem = {texto: 'Não foi possível salvar a lista'};
			});
		};

		function addItem(){
			var totalItens = $scope.lista.itens.length;
			$scope.lista.itens[totalItens] = {};
		}
		function removeItem(item) {
			if (!confirm('Deseja remover este item?')) { return; }
			$scope.lista.itens = $scope.lista.itens.filter(function(it){
				return it != item;
			});
		}

		Lista.query(function(listas) {
			$scope.listas = listas;
		});
	}

})();
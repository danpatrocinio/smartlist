(function() {
	
	'use strict';
	
	angular.module('smartlist').controller('ListasCtrl',ListasCtrl);

	ListasCtrl.$inject = ['Lista','$scope'];
	
	function ListasCtrl(Lista, $scope) {

			$scope.mensagem = {texto: ''};
			$scope.listas = [];
			$scope.filtro = '';

			$scope.buscaListas = buscaListas;
			$scope.salva = salva;
			$scope.remove = remove;
			$scope.edita = edita;
			$scope.addNotificacao = addNotificacao;
			$scope.removeNotificacao = removeNotificacao;
			$scope.init = init;

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

			function salva(lista) {
				Lista.post(lista, buscaListas, 
					function(erro) {
						console.log(erro);
						$scope.mensagem = {texto : 'Não foi possível salvar a lista.'};
					}
				);
			}

			function edita(lista){
				$scope.lista = lista;
			}

			function addNotificacao(){
				console.log('Inserindo notificação');
				if (!$scope.lista.notificacoes) {
					$scope.lista.notificacoes = [];
				}
				var totalNotificacoes = $scope.lista.notificacoes.length;
				$scope.lista.notificacoes[totalNotificacoes] = {};
			};

			function removeNotificacao(item) {
				if (!confirm('Deseja remover este item?')) { return; }
				$scope.lista.notificacoes = $scope.lista.notificacoes.filter(function(notifi){
					return notifi != item;
				});
			};

			function init() {
				console.log('Inicializando app...');
				buscaListas();
			};

			init();
		}
})();
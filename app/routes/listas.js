function verificaAutenticacao(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Não autorizado');
  }
}

module.exports = function(app) {
	
	var controller = app.controllers.lista;
	
	app.route('/listas')
		.get(verificaAutenticacao, controller.listaTodos)
		.post(verificaAutenticacao, controller.salvaLista);

	app.route('/listas/:id')
		.get(verificaAutenticacao, controller.obtemLista)
		.delete(verificaAutenticacao, controller.removeLista);

};
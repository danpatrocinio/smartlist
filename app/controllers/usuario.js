module.exports = function(app) {
	
	var Usuario = app.models.Usuario;

	var controller = {};
	
	controller.listaTodos = function(req, res) {
		Usuario.find()
		.then(
			function(usuarios) {
				res.json(usuarios);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
		);
	};

	controller.obtemUsuario = function(req, res) {
		var _id = req.params.id;
		Usuario.findById(_id).exec()
		.then(
			function(usuario) {
				if (!usuario) throw new Error("Usuário não encontrado");
				res.json(usuario)
			},
			function(erro) {
				console.log(erro);
				res.status(404).json(erro)
			}
		);
	};

	return controller;
};
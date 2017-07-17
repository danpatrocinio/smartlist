module.exports = function(app) {
	
	var Lista = app.models.Lista;
	var Usuario = app.models.Usuario;

	var controller = {};
	
	controller.listaTodos = function(req, res) {
		var usuarioId = req.user._id;
		Lista.find({usuario : usuarioId})
		.then(
			function(listas) {
				res.json(listas);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
		);
	};

	controller.obtemLista = function(req, res) {
		var _id = req.params.id;
		Lista.findById(_id).exec()
		.then(
			function(lista) {
				if (!lista) throw new Error("Lista não encontrado");
				res.json(lista)
			},
			function(erro) {
				console.log(erro);
				res.status(404).json(erro)
			}
		);
	};

	controller.removeLista = function(req, res) {
		var _id = req.params.id;
		Lista.remove({"_id" : _id}).exec()
		.then(
			function() {
				res.end();
			},
			function(erro) {
				return console.error(erro);
			}
		);
	};
	
	controller.salvaLista = function(req, res) {
		var _id = req.body._id;
		var usuarioId = req.user._id;
		if(_id) {
			Lista.findByIdAndUpdate(_id, req.body).exec()
			.then(
				function(lista) {
					res.json(lista);
				},
				function(erro) {
					console.error(erro)
					res.status(500).json(erro);
				}
			);
		} else {
			req.body.usuario = req.user._id;
			Lista.create(req.body)
			.then(
				function(lista) {
					res.status(201).json(lista);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
			);
		}
	};

	return controller;
};
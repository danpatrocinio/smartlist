module.exports = function(app) {
	
	var Lista = app.models.Lista;

	var controller = {};
	
	controller.listaTodos = function(req, res) {
		Lista.find().populate('emergencia').exec()
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
		
		req.body.emergencia = req.body.emergencia || null;

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
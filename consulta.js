var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var _idProcurado = new ObjectID('56913251fad270d45f914814');

MongoClient.connect('mongodb://127.0.0.1:27017/smartlist',
	function(erro, db) {
		if(erro) throw err;
		db.collection('listas').findOne({_id : _idProcurado},
			function(erro, contato) {
				if (erro) throw err;
				console.log(contato);
			}
		);
	}
);
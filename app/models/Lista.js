var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function() {

	var schema = mongoose.Schema({
		usuario: {
			type: Schema.Types.ObjectId,
			ref: 'Usuario',
			required: true
		},
		titulo : {
			type : String,
			unique: true,
			required : true
		},
		tipo : {
			type : String,
			required : true,
			default: 'Mercado'
		},
		itens: [{
			descricao: {
				type: String,
				required : true
			},
			quantidade: Number,
			preco: Number,
			checked: Boolean
		}],
		notificacoes: [{
			dataHora: {
            	type: Date
        	},
			tipo: {
				type: String,
				required: true,
			},
			checked: {
				type: Boolean
			}
		}],
		dataInclusao: {
			type: Date,
			default: Date.now
		},
		dataChecked: Date,
		dataRemocao: Date
	});

	return mongoose.model('Lista', schema);
};

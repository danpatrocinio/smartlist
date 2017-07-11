var mongoose = require('mongoose');
	
module.exports = function() {

	var schema = mongoose.Schema({
		usuario: {
			type: Schema.Types.ObjectId,
			ref: 'Usuario',
			required: true
		},
		descricao : {
			type : String,
			required : true
		},
		itens: [{
			codigo: Number,
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
            	type: Timestamp
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
			type: Timestamp,
			default: Date.now
		},
		dataChecked: Timestamp,
		dataRemocao: Timestamp
	});

	return mongoose.model('Lista', schema);
};
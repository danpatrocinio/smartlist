var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	var schema = mongoose.Schema({
		idLista: {
			type: String,
			required: true
		},
        sequencial: {
            type: Number
        },
		descricao: {
			type: String,
			required: true,
		},
		valor: {
			type: Number
		},
        checked: {
            type: Boolean
        }
	});
	
	schema.plugin(findOrCreate);
	return mongoose.model('ItemLista', schema);
};
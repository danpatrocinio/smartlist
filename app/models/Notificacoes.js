var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {
	var schema = mongoose.Schema({
		idLista: {
			type: String,
			required: true
		},
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
	});
	
	schema.plugin(findOrCreate);
	return mongoose.model('Notificacoes', schema);
};
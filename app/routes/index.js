module.exports = function(app) {
	app.get('/', function(req, res) {
		var login = '';
		var msg = '';
		var linkSair = '';
		var linkAcessar = '';
		if(req.user) {
			login = req.user.login; 
			msg = 'Logado como ';
			linkSair = ' Sair';
		} else {
			linkAcessar = 'Entre pelo GitHub';
		}
		res.render('index', { "msg" : msg, "usuarioLogado" : login, "linkAcessar" : linkAcessar, "linkSair" : linkSair });
	});
};
module.exports.iniciaChat = function(application, req, res){

	/* recupera informações do request através do body-parser */
	var dadosForm = req.body;

	/* valida formulário através do express-validator */
	req.assert('apelido', 'Nome ou apelido é obrigatório!').notEmpty();
	req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres!').len(3, 15);

	var erros = req.validationErrors();

	if (erros) {
		res.render('index.ejs', { validacao: erros });
		return;
	}

	application.get('io').emit('msgParaCliente', { apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat' });

	res.render('chat.ejs', { dadosForm: dadosForm });
}
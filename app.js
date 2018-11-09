/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(80, function(){
	console.log('Servidor online!');
});

var io = require('socket.io').listen( server );

/* seta variável global */
app.set('io', io);

/* criar a conexão por websocket*/
io.on('connection', function(socket){
	
	console.log('Usuário conectou!');

	socket.on('disconnect', function(){
		console.log('Usuário desconectou!');		
	});

	socket.on('msgParaServidor', function(data){
		
		/* dialogo */
		/* emissão para próprio usuário */
		socket.emit(
			'msgParaCliente', 
			{ apelido: data.apelido, mensagem: data.mensagem }
		);

		/* emissão para demais usuários do socket */
		socket.broadcast.emit(
			'msgParaCliente', 
			{ apelido: data.apelido, mensagem: data.mensagem }
		);

		/* participantes */
		/* emissão para próprio usuário */
		if ( parseInt(data.apelido_atualizado_nos_clientes) == 0 ) {

			socket.emit(
				'participantesParaCliente', 
				{ apelido: data.apelido }
			);

			/* emissão para demais usuários do socket */
			socket.broadcast.emit(
				'participantesParaCliente', 
				{ apelido: data.apelido }
			);

		}

	});

});
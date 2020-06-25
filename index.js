'use strict';

const mongoose = require('mongoose');
const app = require('./app');
const envJSON = require('./env.variables.json');
const fs = require('fs');
const https = require('https');
const node_env = process.env.NODE_ENV || 'development';
const puerto = process.env.PORT || envJSON[node_env].PORT_P;
const puertoDev = process.env.PORT || envJSON[node_env].PORT_D;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

//HTTPS

if (node_env === 'production') {
	const key = ''; //envJSON[node_env].KEY_SSL_P;
	const cert = ''; //envJSON[node_env].CERT_SSL_P;
	https
		.createServer(
			{
				key: fs.readFileSync(key),
				cert: fs.readFileSync(cert),
			},
			app
		)
		.listen(puerto, function() {
			console.log('Servidor Pro-035 Corriendo En: ' + puerto);
			console.log('ENTORNO: ' + node_env);
		});
} else {
	app.listen(puertoDev, () => {
		console.log('Servidor corriendo en http://localhost: ' + puertoDev);
		console.log('ENTORNO: ' + node_env);
	});
}

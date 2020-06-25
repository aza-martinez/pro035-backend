'use strict';

const mongoose = require('mongoose');
process.setMaxListeners(0);

class Mongo {
	async connect(nameBD) {
		await mongoose.connection.close();
		await mongoose
			.connect(`mongodb+srv://srendon:tT2WwrqXoeiJgHp6@cluster0-hjkav.azure.mongodb.net/nom35_${nameBD}?retryWrites=true&w=majority`, {
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
				useUnifiedTopology: true,
			})
			.then(function() {})
			.catch(function(error) {});
	}

	async close() {
		await mongoose.connection.close(() => {});
		return true;
	}
}

module.exports = Mongo;

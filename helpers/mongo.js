'use strict';

const mongoose = require('mongoose');
process.setMaxListeners(0);

class Mongo {
	async connect(nameBD) {
		await mongoose.connection.close();
		await mongoose
      .connect(
        `mongodb+srv://Pro035mdb:MyiId3lB35CDkURk@pro035cluster-len4q.mongodb.net/Pro035_${nameBD}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
          useUnifiedTopology: true,
        }
      );
	}

	async close() {
		await mongoose.connection.close(() => {});
		return true;
	}
}

module.exports = Mongo;

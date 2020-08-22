const mongoose = require("mongoose");

require('./models/Driver');
require('./models/Car');
require('./models/Trip');

mongoose.connect(process.env.MONGO_DB_URI);

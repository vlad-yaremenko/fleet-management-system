const mongoose = require("mongoose");

require('./models/Penalty');

mongoose.connect(process.env.MONGO_DB_URI);

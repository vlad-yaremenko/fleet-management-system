require('dotenv').config();
const app = require('./src/app');
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB_URI);

app.listen(3000, () => {
  console.log("running on port 3000");
});

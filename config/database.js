var mongoose = require("mongoose");
require("dotenv").config();
const server = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
const database = process.env.DB_NAME;

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(`mongodb://${server}:${dbport}/${database}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        keepAlive: true,
        useFindAndModify: false,
      })
      .then(() => {
        console.log(
          `Database connected successful Server ${server} Port ${dbport} Database ${database}`
        );
      })
      .catch((err) => {
        console.error("Database connection error::" + err);
      });
  }
}
module.exports = new Database();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const currency = require("./routes/currency");
require("./config/database");

// initializing express
const app = express();

// port setup
const port = process.env.PORT || 3001;

// express middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use("/api/currency", currency);

// default route
app.use("/", (req, res) => {
  res.render("index", { title: "welcome to Currency Converter" });
});

// invalid routes
app.use((req, res, next) => {
  let error = new Error("URL Not Found");
  res.status(404).json({
    message: error.message,
  });
});

// start server
app.listen(port, () => console.log(`Server listening at port ${port}`));

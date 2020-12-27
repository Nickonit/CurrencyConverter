const express = require("express");
const router = express.Router();
const currency = require("../controllers/currency");

router.post("/add",currency.addCurrency);
router.get("/get",currency.getCurrency);

module.exports = router;
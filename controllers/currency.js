const Currency = require("../model/Currency");

module.exports = {
  addCurrency: async (req, res) => {
    try {
      let { currencyName, currencyCode } = req.body;
      if (
        currencyCode !== "" &&
        currencyCode !== undefined &&
        currencyName !== "" &&
        currencyName !== undefined
      ) {
        req.body.currencyCode = currencyCode.toUpperCase();
        let isExist = await Currency.findOne({
          currencyCode: currencyCode,
          status: true,
        });
        if (isExist) {
          return res.json({
            status: 400,
            message: "Currency Already Exist",
          });
        }
        let saveCurrency = await Currency(req.body).save();
        return res.json({
          status: 200,
          message: "Currency Save Successfully",
          saveCurrency,
        });
      } else {
        return res.json({
          status: 400,
          message: "Currency Name and Currency Code Should not be Empty",
        });
      }
    } catch (error) {
      return res.json({
        status: 400,
        message: "Something went Wrong",
      });
    }
  },
  getCurrency: async (req, res) => {
    try {
      let allCurrency = await Currency.find(
        { status: true },
        { currencyCode: 1, currencyName: 1 }
      );
      return res.json({
        status: 200,
        message: "Currency Featch successfully",
        allCurrency,
      });
    } catch (error) {
      return res.json({
        status: 400,
        message: "Something went Wrong",
      });
    }
  },
};

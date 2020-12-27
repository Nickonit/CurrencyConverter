import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyConverter from "./CurrencyConverter";

let App = () => {
  const [countryCurrency, setCuntryCurrency] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = (amount * exchangeRate).toFixed(3);
  } else {
    toAmount = amount;
    fromAmount = (amount / exchangeRate).toFixed(3);
  }
  useEffect(() => {
    fetch("http://localhost:3001/api/currency/get")
      .then((res) => res.json())
      .then((data) => {
        let firstCurrency = data.allCurrency[0].currencyCode;
        let secondCurrency = data.allCurrency[1].currencyCode;
        setCuntryCurrency(data.allCurrency);
        setFromCurrency(firstCurrency);
        setToCurrency(secondCurrency);
      });
    fetch(`https://api.exchangeratesapi.io/latest?base=INR&symbols=AUD`)
      .then((res) => res.json())
      .then((data) => setExchangeRate(data.rates["AUD"]));
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(
        `https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`
      )
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(e) {
    if (e.target.value.length < 25) {
      setAmount(parseFloat(e.target.value));
      setAmountFromCurrency(true);
    } else {
      console.log("upper hit");
    }
  }

  function handleToAmountChange(e) {
    if (e.target.value.length < 25) {
      setAmount(parseFloat(e.target.value));
      setAmountFromCurrency(false);
    } else {
      console.log("lower hit");
    }
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <h3>From</h3>
      <table>
        <CurrencyConverter
          countryCurrency={countryCurrency}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <tr>
          <td colSpan={2}>
            <h3>To</h3>
          </td>
        </tr>
        <CurrencyConverter
          countryCurrency={countryCurrency}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </table>
    </>
  );
};

export default App;

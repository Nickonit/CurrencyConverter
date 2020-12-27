import React from "react";

export default function CurrencyConverter(props) {
  const {
    countryCurrency,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount,
  } = props;

  return (
    <tr>
      <td>
        <input
          className={"form-control"}
          type="number"
          value={amount}
          onChange={onChangeAmount}
          min="1"
        />
      </td>
      <td>
        <select
          className={"form-control"}
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          {countryCurrency.map((option) => (
            <option key={option.currencyCode} value={option.currencyCode}>
              {option.currencyName}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}

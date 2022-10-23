import React, { useState } from "react";

const Select = () => {
  const [select, setSelect] = useState("EUR");

  return (
    <select
      className="form-select shadow"
      id="selector"
      aria-label="Default select example"
      value={select}
      onChange={(e) => {
        const selectedCurrency = e.target.value;
        setSelect(selectedCurrency);
      }}
    >
      <option className="option-rates" value="EUR">
        &#8364; &emsp; EUR
      </option>
      <option className="option-rates" value="USD">
        &#36; &emsp; USD
      </option>
      <option className="option-rates" value="CHF">
        &#8355; &emsp; CHF
      </option>
    </select>
  );
};
export default Select;

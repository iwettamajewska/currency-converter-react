import React from "react";

const Input = ({ inputValue }) => {
  return (
    <input
      type="number"
      min="1"
      // value="100"
      placeholder="100"
      className="form-control shadow amount-of-money"
      id="pln-input"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-default"
      onInput={inputValue}
    />
  );
};

export default Input;

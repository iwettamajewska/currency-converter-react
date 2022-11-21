const Input = ({ inputValue }) => {
  return (
    <input
      type="number"
      min="1"
      placeholder="Wprowadź kwotę do przeliczenia"
      className="form-control shadow amount-of-money"
      id="pln-input"
      aria-label="Sizing example input"
      aria-describedby="inputGroup-sizing-default"
      onInput={inputValue}
    />
  );
};

export default Input;

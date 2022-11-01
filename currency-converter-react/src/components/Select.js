const Select = ({ onChange, selectValue }) => {
  return (
    <select
      className="form-select shadow"
      id="selector"
      aria-label="Default select example"
      value={selectValue}
      onChange={onChange}
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

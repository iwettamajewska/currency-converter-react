const Result = ({ calculate }) => {
  return (
    <input
      value={calculate}
      className="form-control shadow result-pln"
      placeholder="wynik"
      readOnly
    />
  );
};

export default Result;

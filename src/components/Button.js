const Button = ({ calculate }) => {
  return (
    <button
      type="button"
      className="btn btn-primary btn-warning shadow"
      onClick={calculate}
    >
      Przelicz
    </button>
  );
};

export default Button;

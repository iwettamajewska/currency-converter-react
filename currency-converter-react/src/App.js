import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";
import Result from "./components/Result";
import Button from "./components/Button";
import { useEffect } from "react";

function App() {
  const availablecurrencies = ["EUR", "USD", "CHF"];
  // const url = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json";
  // const urlEffectiveDate = "http://api.nbp.pl/api/exchangerates/tables/A/";

  const showInputValue = (e) => {
    console.log(e.target.value);
  };

  const showCalculate = () => {
    console.log("clicked button");
  };

  const calculateCurrency = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
      fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json")
        .then((response) => response.json())
        .then((data) => {
          threeCurrencies = data[0].rates.filter((element) =>
            availablecurrencies.includes(element.code)
          );
          const selectValue = selector.value;
          const mid = threeCurrencies.find(
            (element) => element.code === selectValue
          ).mid;
          outOfmoney.value = Number.parseFloat(
            inputOfmoney.value * mid
          ).toFixed(2);
        })
        .catch((err) => console.log("err", err));

      // fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json")
      // .then((response) => response.json())
      // .then((data) => {
      //   threeCurrencies = data[0].rates.filter((element) =>
      //     availablecurrencies.includes(element.code)
      //   );
      //   const selectValue = selector.value;
      //   const mid = threeCurrencies.find(
      //     (element) => element.code === selectValue
      //   ).mid;
      //   outOfmoney.value = Number.parseFloat(inputOfmoney.value * mid).toFixed(
      //     2
      //   );
      // })
      // .catch((err) => console.log("err", err));
    });
  };

  calculateCurrency();

  return (
    <div className="container-sm shadow rounded">
      <div className="row logo-main-text-row">
        <div className="col-4">
          <i className="bi bi-currency-exchange logo shadow"></i>
        </div>
        <div className="col text main-text">Przelicznik walut</div>
      </div>
      <div className="row text-row">
        <label htmlFor="pln-input" className="col text">
          Posiadam PLN
        </label>
        <label htmlFor="selector" className="col text">
          Wybrana waluta
        </label>
        <div className="col-1"></div>
        <label htmlFor="result-input" className="col text">
          Po przeliczeniu
        </label>
      </div>
      <div className="row row-input input-row text-center shadow-sm">
        <div className="col">
          <Input inputValue={showInputValue} />
        </div>
        <div className="col">
          <Select />
        </div>
        <div className="col-1">
          <i className="bi bi-arrow-right arrow"></i>
        </div>
        <div className="col">
          <div className="input-group mb-3">
            <Result calculate={showCalculate} />
          </div>
        </div>
        <div className="row">
          <div className="col-5"></div>
          <div className="col-2">
            <Button />
          </div>
        </div>
        <div className="row row-effective-date">
          <span className="col-3 effective-date-text text">
            Ostatnia aktualizacja:
          </span>
          <span className="col effective-date text"></span>
        </div>
      </div>
    </div>
  );
}

export default App;

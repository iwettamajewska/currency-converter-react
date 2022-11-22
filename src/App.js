import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";
import Result from "./components/Result";
import Button from "./components/Button";
import { useEffect, useState } from "react";

const availableCurrencies = ["EUR", "USD", "CHF"];
const url = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json/";
const urlEffectiveDate = "http://api.nbp.pl/api/exchangerates/tables/A/";

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [selectValue, setSelectValue] = useState("EUR");
  const [outOfmoney, setOutOfmoney] = useState(0);
  const [effeciveDate, setEffectiveDate] = useState("");
  const [err, setErr] = useState(false);

  const showInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const showSelectValue = (e) => {
    setSelectValue(e.target.value);
  };

  const getOutOfMoney = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const threeCurrencies = data[0].rates.filter((element) =>
          availableCurrencies.includes(element.code)
        );

        const mid = threeCurrencies.find(
          (element) => element.code === selectValue
        ).mid;
        setOutOfmoney(Number.parseFloat(inputValue * mid).toFixed(2));
      })
      .catch((err) => setErr(true));
  };

  useEffect(() => {
    fetch(urlEffectiveDate)
      .then((response) => response.json())
      .then((data) => {
        setEffectiveDate(data[0].effectiveDate);
      })
      .catch((err) => setErr(true));
  }, []);

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
          <Select selectValue={selectValue} onChange={showSelectValue} />
        </div>
        <div className="col-1">
          <i className="bi bi-arrow-right arrow"></i>
        </div>
        <div className="col">
          <div className="input-group mb-3">
            <Result calculate={outOfmoney} />
          </div>
        </div>
        <div className="row">
          <div className="col-5"></div>
          <div className="col-2">
            <Button calculate={getOutOfMoney} />
          </div>
        </div>
        <div className="row row-effective-date">
          <span className="col-3 effective-date-text text">
            Ostatnia aktualizacja:
          </span>
          <span className="col effective-date text">{effeciveDate}</span>
          {err && (
            <span className="alert-text">Wystąpił błąd pobierania danych.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

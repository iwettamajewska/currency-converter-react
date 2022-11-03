import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";
import Result from "./components/Result";
import Button from "./components/Button";
import { useEffect } from "react";
import { useState } from "react";

const availablecurrencies = ["EUR", "USD", "CHF"];

function App() {
  const url = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json";
  const urlEffectiveDate = "http://api.nbp.pl/api/exchangerates/tables/A/";

  const [inputValue, setInputValue] = useState(0);
  const [selectValue, setSelectValue] = useState("EUR");
  const [outOfmoney, setOutOfmoney] = useState(0);

  const showInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const showSelectValue = (e) => {
    setSelectValue(e.target.value);
  };

  // const showCalculate = () => {
  //   console.log("clicked button");
  // };

  const getOutOfMoney = () => {
    console.log("clicked button");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const threeCurrencies = data[0].rates.filter((element) =>
          availablecurrencies.includes(element.code)
        );

        const mid = threeCurrencies.find(
          (element) => element.code === selectValue
        ).mid;
        setOutOfmoney(Number.parseFloat(inputValue * mid).toFixed(2));
      })
      .catch((err) => console.log("err", err));
  };

  console.log(inputValue, selectValue);

  useEffect(() => {
    fetch(urlEffectiveDate)
      .then((response) => response.json())
      .then((data) => {
        let effectiveDate = document.querySelector(".effective-date");
        effectiveDate.innerHTML = data[0].effectiveDate;
      })
      .catch((err) => console.error("err", err));
  }, []);

  // const calculateCurrency = () => {
  //   const [error, setError] = useState(null);
  //   const [isLoaded, setIsLoaded] = useState(false);
  //   const [items, setItems] = useState([]);
  // }

  // useEffect(() => {
  //   fetch("https://api.nbp.pl/api/exchangerates/tables/A/?format=json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const threeCurrencies = data[0].rates.filter((element) =>
  //         availablecurrencies.includes(element.code)
  //       );

  //       const mid = threeCurrencies.find(
  //         (element) => element.code === selectValue
  //       ).mid;
  //       setOutOfmoney(Number.parseFloat(inputValue * mid).toFixed(2));
  //     })
  //     .catch((err) => console.log("err", err));
  // }, []);

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
          <span className="col effective-date text"></span>
        </div>
      </div>
    </div>
  );
}

export default App;

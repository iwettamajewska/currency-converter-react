import "./App.css";
import Input from "./components/Input";
import Select from "./components/Select";
import Result from "./components/Result";
import Button from "./components/Button";
import { useEffect, useState } from "react";

const availableCurrencies = ["EUR", "USD", "CHF"];
const url = "https://api.nbp.pl/api/exchangerates/tables/A/?format=json/";
const urlEffectiveDate = "http://api.nbp.pl/api/exchangerates/tables/A/";
// const errorText = "error text";

function App() {
  const [inputValue, setInputValue] = useState(0);
  const [selectValue, setSelectValue] = useState("EUR");
  const [outOfmoney, setOutOfmoney] = useState(0);
  // const [err, setErr] = useState(null);

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
      .catch((err) => console.error("err", err));
  };

  // (err) => setErr(err)
  // (err ? { errorText } : "")
  // console.error("err", err)
  // err({ errorText })

  // const ErrorHandler = ({ err }) => {
  //   return (
  //     <div role="alert">
  //       <p>An error occurred:</p>
  //       <pre>{err.message}</pre>
  //     </div>
  //   );
  // };

  useEffect(() => {
    fetch(urlEffectiveDate)
      .then((response) => response.json())
      .then((data) => {
        // const effectiveDate = data[0].effectiveDate;
        // effectiveDate.innerHTML = data[0].effectiveDate;
        // const effectiveDate = document.querySelector(".effective-date");
        // effectiveDate.innerHTML = data[0].effectiveDate;

        const effectiveDate = document.querySelector(".effective-date");
        effectiveDate.innerHTML = data[0].effectiveDate;
      })
      .catch((err) => console.error("err", err));
  }, []);

  // err
  // ()();
  //   {
  //   return <ErrorHandler error={error} />
  // }
  // (err) => (err ? { errorText } : "")
  // <p>error</p>
  // console.error("err", err)

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
          {/* (({getOutOfMoney.err}) ? {errorText} : "") */}
          {/* {err.length ===
            1(<span className="alert-text">error text error text</span>)} */}
          {/* if(isLoading) {
        return (
        <div> Loading... </div>
        )
    } */}
        </div>
      </div>
    </div>
  );
}

export default App;

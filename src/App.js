import React, { useState } from "react";
import "./App.scss";
import Display from "./components/display";
import CustomButton from "./components/custom-button";
import { NUMBERS, OPERATIONS } from "./static/numbers";
function App() {
  const [input, setInput] = useState("");
  const [lastIsOpr, setLastIsOpr] = useState(false);
  const handleNumPadClick = (e) => {
    let num = e.target.value;
    console.log(num, input);
    // if()
    if ((input === "0" || input === "" || input === 0) && num !== ".") {
    } else {
      console.log(
        input.lastIndexOf("."),
        input.lastIndexOf("-"),
        input.lastIndexOf("+")
      );
      if (
        ((input.lastIndexOf("+") !== -1 &&
          input.lastIndexOf(".") > input.lastIndexOf("+")) ||
          (input.lastIndexOf("-") !== -1 &&
            input.lastIndexOf(".") > input.lastIndexOf("-")) ||
          (input.lastIndexOf("*") !== -1 &&
            input.lastIndexOf(".") > input.lastIndexOf("*")) ||
          (input.lastIndexOf("/") !== -1 &&
            input.lastIndexOf(".") > input.lastIndexOf("/"))) &&
        num === "."
      ) {
        num = input;
      } else if (
        input.lastIndexOf("+") === -1 &&
        input.lastIndexOf("-") === -1 &&
        input.lastIndexOf("*") === -1 &&
        input.lastIndexOf("/") === -1 &&
        input.lastIndexOf(".") !== -1 &&
        num === "."
      ) {
        num = input;
      } else {
        num = input + num;
      }
    }
    setInput(num);
    setLastIsOpr(false);
  };
  const handleOprPadClick = (e) => {
    let opr = e.target.value;
    let temp = input;
    console.log(opr, "value");
    if (lastIsOpr) {
      if (opr === "+" || opr === "-") {
        if (
          temp.charAt(temp.length - 1) === "+" ||
          temp.charAt(temp.length - 1) === "-"
        ) {
          if (isNaN(temp.charAt(temp.length - 2))) {
            temp = temp.slice(0, -2);
          } else {
            temp = temp.slice(0, -1);
          }
        }
      } else {
        temp = temp.slice(0, -1);
      }
    }
    if (input === "") {
      if (opr === "+" || opr === "-") {
        setInput(temp + opr);
      }
    } else {
      setInput(temp + opr);
    }
    setLastIsOpr(true);
  };
  const calculateSum = (e) => {
    // eslint-disable-next-line no-eval
    let num = eval(input);
    console.log(num);
    setInput(`${num}`);
  };
  return (
    <div className="container">
      <header>
        <div className="title">Calculator</div>
      </header>
      <div className="calculator">
        <Display value={input} />
        <div className="clear-backspace-container">
          <button
            className="clr-bks-btn"
            id="clear"
            onClick={() => setInput("0")}
          >
            AC
          </button>
          <button className="clr-bks-btn" id="backspace">
            CE
          </button>
          <button
            className="clr-bks-btn"
            id="backspace"
            onClick={() => setInput(input.slice(0, -1))}
          >
            C
          </button>
          <button className="clr-bks-btn last" id="backspace">
            <sup>+</sup>&#8260;<sub>&#8722;</sub>
          </button>
        </div>
        <div className="pad-box">
          <div className="num-pad">
            <React.Fragment>
              {Object.keys(NUMBERS).map((id) => {
                return (
                  <CustomButton
                    key={NUMBERS[id]}
                    id={id}
                    num={NUMBERS[id]}
                    handleClick={handleNumPadClick}
                  />
                );
              })}
              <CustomButton
                key={"="}
                id={"equals"}
                num={"="}
                handleClick={calculateSum}
              />
            </React.Fragment>
          </div>

          <div className="operation-pad">
            {Object.keys(OPERATIONS).map((id) => {
              return (
                <CustomButton
                  key={OPERATIONS[id]}
                  id={id}
                  handleClick={handleOprPadClick}
                  num={OPERATIONS[id]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

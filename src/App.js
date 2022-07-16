import React from "react";
import { InputForm } from "./features/inputForm/InputForm";
import { TableEmployers } from "./features/tableEmployers/tableEmployers";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InputForm />
        <TableEmployers />
      </header>
    </div>
  );
}

export default App;

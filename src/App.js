import React from "react";
import { InputForm } from "./features/inputForm/InputForm";
import { TableEmployers } from "./features/tableEmployers/tableEmployers";
import PdfViewer from "./features/pdfViewer/pdfViewer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <span>
          Стек: Front-end(Html + CSS + JS + ReactJs) / Back-end(NodeJs + Express
          + PostgreSQL)
        </span>
      </div>
      <header className="App-header">
        {/* <InputForm />
        <TableEmployers /> */}
        <PdfViewer />
      </header>
    </div>
  );
}

export default App;

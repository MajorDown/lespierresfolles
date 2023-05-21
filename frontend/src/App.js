import React from "react";
import "./styles/style.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;

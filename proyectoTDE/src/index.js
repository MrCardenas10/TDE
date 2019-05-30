import React from "react";
import ReactDOM from "react-dom";

import Login from "./pages/producto/Login";
import Recuperar from "./pages/producto/Recuperar";
import Reset from "./pages/producto/Reset";
import App from "./App";

let URLactual = window.location.pathname;

if (URLactual === "/recuperar") {
  ReactDOM.render(<Recuperar />, document.getElementById("root"));
} else if ("user" in localStorage) {
  ReactDOM.render(<Reset />, document.getElementById("root"));
} else if ("token" in localStorage) {
  ReactDOM.render(<App />, document.getElementById("root"));
} else {
  ReactDOM.render(<Login />, document.getElementById("root"));
}

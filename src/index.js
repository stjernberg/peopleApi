import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import DemoRouter from "./components/DemoRouter";

ReactDOM.render(
  <React.StrictMode>
    <DemoRouter />
  </React.StrictMode>,
  document.getElementById("root")
);

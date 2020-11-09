import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import PageContainer from "./AppContainer/PageContainer/PageContainer";
import Ads from "./AppContainer/PageContainer/Pages/Marketing/Ads";
import Meetings from "./AppContainer/PageContainer/Pages/Management/Meetings";
import AdDetail from "./AppContainer/PageContainer/Pages/Marketing/AdDetail";

ReactDOM.render(
  <React.StrictMode>
    <Meetings />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import PageContainer from "./AppContainer/PageContainer/PageContainer";
import Ads from "./AppContainer/PageContainer/Pages/Marketing/Ads";

<<<<<<< HEAD
ReactDOM.render(
  <React.StrictMode>
    <Ads />
  </React.StrictMode>,
  document.getElementById('root')
);
=======
ReactDOM.render(<Ads />, document.getElementById("root"));
>>>>>>> 8a9a5c2a2911925ff5d9f606848e783be2e7ebc9

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

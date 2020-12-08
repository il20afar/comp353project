import React from "react";
import AppContainer from "./AppContainer/AppContainer";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";

const App = () => (
  <Router basename="/comp353project/frontend/build">
    <AppContainer />
  </Router>
);

export default App;

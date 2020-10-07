//[IMPORTS]
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import LoginContainer from "./LoginContainer/LoginContainer";
import PageContainer from "./PageContainer/PageContainer";

import { D } from "../Utils/Utils";
import "./AppContainer.scss";

//[FUNCTIONAL COMPONENTS]
const AppContainer = () => {
  const [loginPage, setLoginPage] = useState(true);
  const user = useRef({ name: "Anonymous" });

  const handleLogin = (username, pw) => {
    user.current.name = username;
    setLoginPage(false);
  };

  return (
    <D cn="main-container">
      {loginPage ? (
        <LoginContainer {...{ handleLogin }} />
      ) : (
        <PageContainer {...{ user }} />
      )}
    </D>
  );
};

//[EXPORTS]
export default AppContainer;

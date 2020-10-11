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
    fetch("http://localhost:80/comp353project/backend/register.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: username, password: pw }),
    })
    .then(res => res.json())
    .then(data => {
      if (data === "Account found!") {
        user.current.name = username;
        setLoginPage(false);
      } else {
        // For now this does absolutely nothing
        // TODO: display some kind of "Invalid Credentials" alert
      }
    })
    .catch(error => {
      console.error('Error: ', error);
    });
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

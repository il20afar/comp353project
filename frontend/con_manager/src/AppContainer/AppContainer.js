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

  const handleLogin = (username, password) => {
    fetch("http://localhost:3001/backend/main.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "user",
        action: "login",
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === "Account found!") {
          user.current.name = username;
          setLoginPage(false);
        } else {
          // For now this does absolutely nothing
          // TODO: display some kind of "Invalid Credentials" alert
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
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

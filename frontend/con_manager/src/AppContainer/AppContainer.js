//[IMPORTS]
import React from "react";
import { LoginContainer, PageContainer, D, data } from "../imports";
import "./AppContainer.scss";

const loginStates = {
  idle: "idle",
  invalid: "invalid",
  success: "success",
};

//[FUNCTIONAL COMPONENTS]
const AppContainer = () => {
  const [loginPage, setLoginPage] = React.useState(loginStates.idle);
  const user = React.useRef(null);

  const handleLogin = async (username, pw) => {
    const res = await data.send("users", "login", { username, pw });
    if (res.users) {
      user.current = { username, ...res.users[0] };
      setLoginPage(loginStates.success);
    } else {
      window.setTimeout(() => {
        setLoginPage(loginStates.idle);
      }, 1200);
      setLoginPage(loginStates.invalid);
    }
  };

  return (
    <D cn="main-container">
      {loginPage !== loginStates.success ? (
        <LoginContainer
          {...{
            loginStates,
            setLoginPage,
            handleLogin,
            invalidLogin: loginPage === loginStates.invalid,
          }}
        />
      ) : (
        <PageContainer {...{ user: user }} />
      )}
    </D>
  );
};

//[EXPORTS]
export default AppContainer;

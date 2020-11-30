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
  const setUser = (newUser) => {
    user.current = newUser;
  };

  const handleLogin = async (username, pw) => {
    // Getting response from server
    const res = await data.send("users", "login", { username, pw });

    if (res.users) {
      const session = await data.send("session", "start");

      setUser({ username, ...res.users[0] });
      localStorage.setItem("con_manager_user", JSON.stringify(user.current));

      setLoginPage(loginStates.success);
    } else {
      window.setTimeout(() => {
        setLoginPage(loginStates.idle);
      }, 1200);
      setLoginPage(loginStates.invalid);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("con_manager_user");
    setLoginPage(loginStates.idle);
  };

  React.useEffect(() => {
    (async () => {
      const ses = await data.send("session", "check");
      const localUserString = localStorage.getItem("con_manager_user");

      if (localUserString) {
        setUser(JSON.parse(localUserString));
        setLoginPage(loginStates.success);
      }
    })();
  }, []);

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
        <PageContainer {...{ user: user, handleLogOut: handleLogOut }} />
      )}
    </D>
  );
};

//[EXPORTS]
export default AppContainer;

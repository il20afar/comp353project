//[IMPORTS]
import React from "react";
import { LoginContainer, PageContainer, D, data } from "../imports";
import "./AppContainer.scss";

//[FUNCTIONAL COMPONENTS]
const AppContainer = () => {
  const [loginPage, setLoginPage] = React.useState(true);
  const user = React.useRef(null);

  const handleLogin = async (username, password) => {
    const res = await data.send("user", "login", { username, password });
    if (res.user) {
      user.current = { username, ...res.user[0] };
      console.log(res);
      setLoginPage(false);
    } else {
      console.log(res);

      // For now this does absolutely nothing
      // TODO: display some kind of "Invalid Credentials" alert
    }
  };

  return (
    <D cn="main-container">
      {loginPage ? (
        <LoginContainer {...{ handleLogin }} />
      ) : (
        <PageContainer {...{ user: user }} />
      )}
    </D>
  );
};

//[EXPORTS]
export default AppContainer;

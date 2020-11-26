import React from "react";
import { D, TextBox, Button, Ads } from "../../imports";
import "../../Styles/Utils.scss";
import "./LoginContainer.scss";

const LoginContainer = (props) => {
  const { loginStates, setLoginPage, handleLogin, invalidLogin } = props;
  const [showLogin, setShowLogin] = React.useState(false);
  const refs = {
    username: React.useRef(null),
    password: React.useRef(null),
    adsButton: React.useRef(null),
    loginButton: React.useRef(null),
  };

  const isLoginEntered = () =>
    refs.username.current.value != "" && refs.password.current.value !== "";

  const handlers = {
    login: {
      onChange: () => {
        isLoginEntered()
          ? refs.loginButton.current.classList.add("show")
          : refs.loginButton.current.classList.remove("show");
      },
      onSubmit: () => {
        isLoginEntered() &&
          handleLogin(refs.username.current.value, refs.password.current.value);
      },
    },
  };

  // Component mounted
  React.useEffect(() => {
    if (showLogin) {
      ["username", "password"].forEach(
        (elem) => (refs[elem].current.value = "")
      );
      const listenEnter = (e) => {
        if (e.key === "Enter") {
          handlers.login.onSubmit();
        }
      };
      document.addEventListener("keyup", listenEnter);

      // Component unmounted
      return () => {
        document.removeEventListener("keyup", listenEnter);
      };
    }
  }, [showLogin]);

  return (
    <D cn={`login-container`}>
      <div className="ads-wrapper">
        <Ads type="login" visibility="public" />
      </div>

      <D cn="login-logo">CON MANAGER</D>
      <D cn="login-button">
        <Button
          content={{ show: "LOGIN" }}
          style={{
            show: { fontSize: "20px", height: "40px", lineHeight: "40px" },
          }}
          onClick={() => setShowLogin(!showLogin)}
        />
      </D>
      {showLogin && (
        <D cn="login-full-width-wrapper">
          <D cn="login">
            <D cn="login-inputs">
              {["username", "password"].map((x) => (
                <D key={x} cn="username-container">
                  <TextBox
                    type={"input"}
                    subType={x}
                    ref={refs[x]}
                    placeholder={`${x[0].toUpperCase()}${x.slice(1)}`}
                    onChange={handlers.login.onChange}
                  />
                </D>
              ))}
            </D>
            <D
              ref={refs.loginButton}
              cn="button-container"
              style={{ visibility: "visible" }}
            >
              <Button
                content={{ show: "LOGIN" }}
                onClick={handlers.login.onSubmit}
              />
            </D>
            {invalidLogin && (
              <D
                cn="invalidLogin"
                onClick={() => setLoginPage(loginStates.idle)}
              >
                Invalid username or password
              </D>
            )}
          </D>
        </D>
      )}
    </D>
  );
};

export default LoginContainer;

import React from "react";
import { D, TextBox, Button, Condos } from "../../imports";
import "../../Styles/Utils.scss";
import "./LoginContainer.scss";

const LoginContainer = (props) => {
  const { loginStates, setLoginPage, handleLogin, invalidLogin } = props;
  const [showLogin, setShowLogin] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({
    username: "",
    password: "",
  });

  const loginButtonRef = React.useRef(null);

  const isLoginEntered = () =>
    inputValues.username != "" && inputValues.password !== "";

  const handlers = {
    login: {
      onChange: (eventKey, newValue) => {
        inputValues[eventKey] = newValue;
        setInputValues(Object.assign({}, inputValues));
        isLoginEntered()
          ? loginButtonRef.current.classList.add("show")
          : loginButtonRef.current.classList.remove("show");
      },
      onSubmit: () => {
        isLoginEntered() &&
          handleLogin(inputValues.username, inputValues.password);
      },
    },
  };

  // Component mounted
  React.useEffect(() => {
    if (showLogin) {
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
  }, [inputValues, showLogin]);

  return (
    <D cn={`login-container`}>
      <div className="ads-wrapper">
        <Condos type="login" visibility="public" />
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
                    key={`textbox-field${x}`}
                    type={"input"}
                    subType={x}
                    initialValue={inputValues[x]}
                    focusOnRender={x === "username"}
                    placeholder={`${x[0].toUpperCase()}${x.slice(1)}`}
                    onChange={(value) => handlers.login.onChange(x, value)}
                  />
                </D>
              ))}
            </D>
            <D
              ref={loginButtonRef}
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

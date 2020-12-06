import React from "react";
import { D, TextBox, Button, Condos, InputModal } from "../../imports";
import { useHistory } from "react-router-dom";
import "../../Styles/Utils.scss";
import "./AdminContainer.scss";

const AdminContainer = (props) => {
  const { loginStates, setLoginPage, handleLogin, invalidLogin } = props;
  const [showLogin, setShowLogin] = React.useState(false);
  const [inputValues, setInputValues] = React.useState({
    username: "",
    password: "",
  });
  const [inputModalView, setInputModalView] = React.useState(true);

  const history = useHistory();

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
    <D cn={`admin-container`}>
      <InputModal
        key="view-input-modal"
        view={inputModalView}
        isEditable={false}
        widthPadding={400}
        heightPadding={200}
        onClose={() => history.replace("/login")}
        onCancel={() => setInputModalView("menu")}
        onConfirm={async () => {}}
      >
        <div className="admin-login-container">
          {" "}
          <div className="admin-login-text">ADMIN LOGIN: </div>
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
          <D
            ref={loginButtonRef}
            cn="button-container"
            style={{ visibility: "visible" }}
          >
            <Button
              content={{ show: "LOGIN" }}
              style={{
                show: {
                  height: "70px",
                  backgroundColor: "white",
                  border: "3px solid white",
                  color: "white",
                },
              }}
              onClick={handlers.login.onSubmit}
            />
          </D>
          {invalidLogin && (
            <D cn="invalidLogin" onClick={() => setLoginPage(loginStates.idle)}>
              Invalid username or password
            </D>
          )}
        </div>
      </InputModal>
    </D>
  );
};

export default AdminContainer;

import React from "react";
import { D, TextBox, Button, data, InputModal, Header } from "../../imports";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";

import "../../Styles/Utils.scss";
import "./AdminContainer.scss";

const AssociationThumbnail = (props) => {
  const {
    name,
    numberMessages,
    modifiedOn,
    createdBy,
    onClick,
    gridTemplateColumns,
  } = props;
  return (
    <div
      className="thread"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(name)}
    >
      <div className="thread-element-container name">
        <div className="thread-element name">{name}</div>
      </div>
      <div className="thread-element-container modified-on">
        <div className="thread-element modified-on">
          <div>Last updated: </div>
          <div>&nbsp;&nbsp;{modifiedOn}</div>
        </div>
      </div>
      <div className="thread-element-container created-by">
        <div className="thread-element created-by">
          <div>Created by: </div>
          <div>&nbsp;&nbsp;{createdBy}</div>
        </div>
      </div>
      <div className="thread-element-container numbermsg">
        <div className="thread-element numbermsg">
          <div>&nbsp;&nbsp;{numberMessages}</div>
        </div>
      </div>
    </div>
  );
};

const AssociationsMenu = (props) => {
  const { visibleAssociations, setSelectedAssociation } = props;

  const max =
    11.38 * Math.max(...visibleAssociations.map((elem) => elem.title.length));

  return (
    <div className="thread-menu">
      {visibleAssociations.map((elem) => (
        <AssociationThumbnail
          key={uuid()}
          name={elem.title}
          numberMessages={elem.number_of_replies}
          modifiedOn={elem.last_update_time}
          createdBy={elem.creator_username}
          onClick={() => setSelectedAssociation(elem)}
          gridTemplateColumns={`minmax(300px, ${max}px) minmax(0px, 300px) minmax(0px,300px) minmax(60px, 80px)`}
        />
      ))}
    </div>
  );
};

const AdminContainer = (props) => {
  const {} = props;

  const history = useHistory();

  const [view, setView] = React.useState("login");
  const [invalidLogin, setInvalidLogin] = React.useState(false);

  const [adminUser, setAdminUser] = React.useState(null);
  const [associations, setAssociations] = React.useState([]);
  const [selectedAssociations, setSelectedAssociation] = React.useState(null);

  const [associationUsers, setAssociationUsers] = React.useState(null);

  const [inputValues, setInputValues] = React.useState({
    username: "",
    password: "",
  });

  const loginButtonRef = React.useRef(null);

  const handlers = {
    login: {
      isLoginEntered: () =>
        inputValues.username != "" && inputValues.password !== "",
      onChange: (eventKey, newValue) => {
        inputValues[eventKey] = newValue;
        setInputValues(Object.assign({}, inputValues));
        handlers.login.isLoginEntered()
          ? loginButtonRef.current.classList.add("show")
          : loginButtonRef.current.classList.remove("show");
      },
      onSubmit: () => {
        if (handlers.login.isLoginEntered())
          handlers.login.login(inputValues.username, inputValues.password);
      },
      login: async (username, pw) => {
        const res = await data.send("users", "login", { username, pw });
        console.log(res);

        if (res.users) {
          console.log(res.users);
          setAdminUser(res.users);
          setView("adminpage");
        } else {
          window.setTimeout(() => {
            setInvalidLogin(false);
          }, 1200);
          setInvalidLogin(true);
        }
      },
    },
    associtions: {},
    users: {
      getAllUsers: async () => {
        const res = await data.send("users", "get");
        console.log("users: ", res.users);
        setAssociationUsers(res.users);
      },
    },
  };

  const updateThreads = async () => {
    const res = await data.send("threads", "get");
    setAssociations(res.threads);
  };

  // Component mounted
  React.useEffect(() => {
    updateThreads();
    if (view) {
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
  }, [inputValues, invalidLogin]);

  const fields = {
    asso_name: "Name: ",
    asso_desc: "Description: ",
    admin_id: "Administrator: ",
    asso_id: "Users: ",
  };

  return (
    <D cn={`admin-container`}>
      {view === "login" ? (
        <InputModal
          key="view-input-modal"
          view={"display"}
          isEditable={false}
          widthPadding={400}
          heightPadding={200}
          onClose={() => history.replace("/login")}
        >
          <div className="admin-login-container">
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
                    backgroundColor: "black",
                    border: "3px solid white",
                    color: "white",
                  },
                }}
                onClick={handlers.login.onSubmit}
              />
            </D>
            {invalidLogin && (
              <D cn="invalidLogin" onClick={() => setInvalidLogin(false)}>
                Invalid username or password
              </D>
            )}
          </div>
        </InputModal>
      ) : (
        <div className="admin-page">
          <Header
            title="CON MANANGER SYSTEM ADMIN"
            height="80px"
            actions={[
              <Button
                content={{ show: "LOG OUT" }}
                style={{
                  show: {
                    fontSize: "20px",
                    height: "40px",
                    lineHeight: "40px",
                  },
                }}
                onClick={() => history.push("/login")}
              />,
            ]}
          />
          <div className="admin-page-container">
            <div className="admin-associations menu">
              <AssociationsMenu
                visibleAssociations={associations}
                setSelectedAssociation={setSelectedAssociation}
              />
            </div>
            <div className="admin-associations selected">
              {Object.entries(fields).map(([key, val]) => {})}
              <D key={`edit-info-field-${key}`} cn={`edit-info-field ${key}`}>
                <D cn="field-title">{key} </D>
                <div className="field-display"></div>
              </D>
            </div>
          </div>
        </div>
      )}
    </D>
  );
};

export default AdminContainer;

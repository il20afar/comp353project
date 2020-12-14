import React from "react";
import {
  D,
  TextBox,
  Button,
  data,
  InputModal,
  Header,
  UserList,
  UserModModal,
} from "../../imports";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Select from "react-select";

import "../../Styles/Utils.scss";
import "./AdminContainer.scss";
import LoadContainer from "../../Components/LoadContainer/LoadContainer";
import { userFirstLastName } from "../../Utils/Utils";

const AssociationThumbnail = (props) => {
  const {
    name,
    description,
    admin,
    numberUsers,
    onClick,
    gridTemplateColumns,
    ...rest
  } = props;
  return (
    <div
      className="thread"
      style={{ gridTemplateColumns }}
      onClick={() => onClick(name)}
      {...rest}
    >
      <div className="thread-element-container name">
        <div>Name: </div>
        <div className="thread-element name">{name}</div>
      </div>

      <div className="thread-element-container admin">
        <div>Administrator: </div>
        <div className="thread-element admin">
          <div>{admin}</div>
        </div>
      </div>
      <div className="thread-element-container numberusers">
        <span>Number of members:</span>

        <div className="thread-element numberusers">
          <div>{numberUsers}</div>
        </div>
      </div>
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
  const [selectedAssociation, setSelectedAssociation] = React.useState(null);

  const [showUserMod, setShowUserMod] = React.useState(null);
  const createUserRef = React.useRef({
    username: "",
    pw: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    street: "",
    city: "",
    province: "",
    country: "",
    profile_picture: "",
  });

  const [associationUsers, setAssociationUsers] = React.useState([null]);
  const [userOptions, setUserOptions] = React.useState(null);

  const [isCreating, setIsCreating] = React.useState(false);
  const [createMembers, setCreateMembers] = React.useState([]);

  const [inputValues, setInputValues] = React.useState({
    username: "",
    password: "",
  });

  const [
    createAssociationInputValues,
    setCreateAssociationInputValues,
  ] = React.useState({
    asso_name: "",
    asso_desc: "",
    admin_id: "",
    asso_users: "",
  });
  const onCreateAssociationInputValuesChange = (eventKey, newValue) => {
    createAssociationInputValues[eventKey] = newValue;

    setCreateAssociationInputValues(
      Object.assign({}, createAssociationInputValues)
    );
  };

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
        if ([username, pw].every((elem) => elem === "admin")) {
          setView("adminpage");
        } else {
          window.setTimeout(() => {
            setInvalidLogin(false);
          }, 1200);
          setInvalidLogin(true);
        }
      },
      logout: () => {
        history.replace("/login");
      },
    },
    associations: {
      onCreate: async () => {
        const params = {
          asso_name: createAssociationInputValues.asso_name,
          asso_desc: createAssociationInputValues.asso_desc,
          admin_id: Number.parseInt(
            Object.values(associationUsers).find(
              (elem) =>
                userFirstLastName(elem) ===
                createAssociationInputValues.admin_id
            ).user_id
          ),
        };
        const res = await data.send("associations", "create", params);

        if (res === 1) {
          updateAssociations();
          setSelectedAssociation(associations[associations.length - 1]);

          createMembers.forEach(async (elem) => {
            const param = {
              user_id: Number.parseInt(elem.user_id),
              asso_id: Number.parseInt(selectedAssociation.asso_id),
            };
            const tempres = await data.send("associations", "add", param);
          });

          updateAssociations();

          setIsCreating(false);
        }
      },
    },
    users: {
      create: () => {
        setShowUserMod(true);
      },
      getAllUsers: async () => {
        const res = await data.send("users", "get");
        setAssociationUsers(res.users);
        setUserOptions(
          res.users.map((elem) => ({
            value: Number.parseInt(elem.user_id),
            label: userFirstLastName(elem),
          }))
        );
      },
    },
  };

  const updateAssociations = async () => {
    const res = await data.send("associations", "get");
    //
    setAssociations(res.associations);
    if (!selectedAssociation) {
      setSelectedAssociation(res.associations[0]);
    }
  };

  // Component mounted
  React.useEffect(() => {
    if (view === "login") {
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
  }, [inputValues, invalidLogin, adminUser]);

  React.useEffect(() => {
    if (view !== "login") {
      handlers.users.getAllUsers();
      updateAssociations();
    }
  }, [view]);

  return (
    <D cn={`admin-container`}>
      {showUserMod && (
        <UserModModal
          type="create"
          user={createUserRef}
          onClose={() => setShowUserMod(false)}
        />
      )}
      {view === "login" ? (
        <InputModal
          key="view-input-modal"
          view={"display"}
          isEditable={false}
          widthPadding={200}
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
                    marginTop: "10px",
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
                content={{ show: "CREATE USER" }}
                style={{
                  show: {
                    fontSize: "20px",
                    height: "40px",
                    lineHeight: "40px",
                  },
                }}
                onClick={handlers.users.create}
              />,
              <Button
                content={{ show: "LOG OUT" }}
                style={{
                  show: {
                    fontSize: "20px",
                    height: "40px",
                    lineHeight: "40px",
                  },
                }}
                onClick={handlers.login.logout}
              />,
            ]}
          />
          <div className="admin-page-container">
            <div className="admin-associations menu">
              {associations.length > 0 ? (
                <>
                  <div className="thread-menu">
                    {associations.map((elem) => {
                      const numberUsers = associationUsers.filter((user) => {
                        return (
                          Number.parseInt(user.asso_id) ===
                          Number.parseInt(elem.asso_id)
                        );
                      }).length;
                      const admin = associationUsers.find(
                        (user) =>
                          Number.parseInt(user.user_id) ===
                          Number.parseInt(elem.admin_id)
                      );

                      return (
                        <AssociationThumbnail
                          key={uuid()}
                          name={elem.asso_name}
                          description={elem.asso_desc}
                          admin={admin ? userFirstLastName(admin) : ""}
                          numberUsers={numberUsers}
                          onClick={() => setSelectedAssociation(elem)}
                        />
                      );
                    })}
                    {isCreating && (
                      <AssociationThumbnail
                        key={uuid()}
                        name={createAssociationInputValues.asso_name}
                        description={createAssociationInputValues.asso_desc}
                        admin={createAssociationInputValues.admin_id}
                        numberUsers={0}
                        onClick={() => null}
                        style={{ opacity: 0.7 }}
                      />
                    )}
                    {!isCreating && (
                      <Button
                        content={{
                          show: "Add a new association...",
                        }}
                        style={{
                          show: {
                            height: "100px",
                            marginTop: "0px",
                            width: "100%",
                            border: "4px solid rgba(163, 101, 163, 1)",
                            backgroundColor: "transparent",
                            color: "rgba(163, 101, 163, 1)",
                          },
                        }}
                        // dropdown={[]}
                        height="100px"
                        onClick={() => {
                          setIsCreating(true);
                        }}
                      />
                    )}
                  </div>
                </>
              ) : (
                <LoadContainer
                  type="ThreeDots"
                  color="rgb(98,96,186)"
                  height="100px"
                  width="100px"
                />
              )}
            </div>
            <div className="admin-associations selected">
              {selectedAssociation ? (
                <InputModal
                  type={"relative"}
                  key="view-input-modal"
                  view={
                    isCreating &&
                    Object.values(
                      createAssociationInputValues
                    ).every((elem, i) => (i === 3 ? true : elem !== ""))
                      ? "edit"
                      : "display"
                  }
                  isEditable={false}
                  widthPadding={0}
                  heightPadding={0}
                  onConfirm={handlers.associations.onCreate}
                  onClose={() => setIsCreating(false)}
                  onCancel={() => setIsCreating(false)}
                  isCloseable={isCreating}
                  isDeletable={false}
                >
                  <div
                    className="current-selection"
                    style={{
                      backgroundColor: isCreating
                        ? "black"
                        : "rgba(163, 101, 163, 0.8)",
                    }}
                  >
                    {Object.entries(createAssociationInputValues).map(
                      ([key, val]) => {
                        return (
                          <D
                            key={`edit-info-field-${key}`}
                            cn={`edit-info-field ${key}`}
                          >
                            <D cn="field-title">
                              {key === "asso_name"
                                ? "Name:"
                                : key === "asso_desc"
                                ? "Description:"
                                : key === "admin_id"
                                ? "Association administrator:"
                                : "Association members"}
                            </D>
                            <div className="field-display">
                              {isCreating ? (
                                key === "admin-id" ? (
                                  <TextBox
                                    key={`email-input${key}`}
                                    type={
                                      key === "asso_desc" ? "textarea" : "input"
                                    }
                                    initialValue={
                                      createAssociationInputValues[key]
                                    }
                                    onChange={(newValue) =>
                                      onCreateAssociationInputValuesChange(
                                        key,
                                        newValue
                                      )
                                    }
                                    onCancel={() =>
                                      onCreateAssociationInputValuesChange(
                                        key,
                                        ""
                                      )
                                    }
                                    className={key}
                                    placeholder={`${key}:`}
                                    outlineOnChange
                                    focusOnRender={false}
                                    readOnly={false}
                                    height={"asso_desc" ? "auto" : "40px"}
                                  />
                                ) : key === "asso_users" ? (
                                  <div>
                                    <Select
                                      defaultValue={[]}
                                      isMulti
                                      name="colors"
                                      options={userOptions}
                                      className="basic-multi-select"
                                      classNamePrefix="select"
                                    />
                                  </div>
                                ) : (
                                  <div className={`userlist-${key}`}>
                                    <UserList
                                      associationUsers={
                                        key === "asso_users"
                                          ? associationUsers.filter(
                                              (elem) =>
                                                !createMembers
                                                  .map((elem) => elem.user_id)
                                                  .includes(elem.user_id)
                                            )
                                          : associationUsers
                                      }
                                      placeholder={""}
                                      onTypeAheadChange={(value) => {
                                        const selectionId =
                                          value.length === 1 && value[0].id;
                                        const isUser = associationUsers.find(
                                          (user) => user.user_id === selectionId
                                        );
                                        if (isUser) {
                                          if (key === "admin_id") {
                                            onCreateAssociationInputValuesChange(
                                              "admin_id",
                                              userFirstLastName(isUser)
                                            );
                                          } else {
                                            const members = [
                                              isUser,
                                              ...createMembers,
                                            ];
                                            setCreateMembers(members);
                                          }
                                        }
                                      }}
                                    />
                                    {key === "asso_users" && (
                                      <div>
                                        {createMembers
                                          .filter(
                                            (user) =>
                                              user.asso_id ===
                                              selectedAssociation.asso_id
                                          )
                                          .map((user) => (
                                            <div className="createUserBubble">
                                              {userFirstLastName(user)}
                                            </div>
                                          ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              ) : key === "admin_id" ? (
                                userFirstLastName(
                                  associationUsers.find(
                                    (elem) => elem.asso_id === elem.asso_id
                                  )
                                )
                              ) : key === "asso_id" ? (
                                associationUsers.filter((user) => {
                                  return (
                                    Number.parseInt(user.asso_id) ===
                                    Number.parseInt(selectedAssociation.asso_id)
                                  );
                                }).length
                              ) : key === "asso_users" ? (
                                <div
                                  onClick={() => {
                                    setCreateMembers();
                                  }}
                                >
                                  {associationUsers
                                    .filter(
                                      (user) =>
                                        user.asso_id ===
                                        selectedAssociation.asso_id
                                    )
                                    .map((user) => (
                                      <div>{userFirstLastName(user)}</div>
                                    ))}
                                </div>
                              ) : (
                                selectedAssociation[key]
                              )}
                            </div>
                          </D>
                        );
                      }
                    )}
                  </div>
                </InputModal>
              ) : (
                <LoadContainer
                  type="ThreeDots"
                  color="rgb(98,96,186)"
                  height="100px"
                  width="100px"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </D>
  );
};

export default AdminContainer;

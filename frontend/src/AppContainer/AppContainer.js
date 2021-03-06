//[IMPORTS]
import React from "react";
import { v4 as uuid } from "uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  Redirect,
} from "react-router-dom";
import {
  LoginContainer,
  Sidebar,
  Condos,
  Postings,
  Threads,
  Polls,
  Activities,
  Reviews,
  Email,
  Financial,
  Contracts,
  Meetings,
  pageActions,
  Button,
  UserModModal,
  Header,
  data,
} from "../imports";

import "./AppContainer.scss";
import AdminContainer from "./AdminContainer/AdminContainer";

export const MainContext = React.createContext({ user: null });

// Login handler
const authHandler = {
  states: {
    idle: "idle",
    invalid: "invalid",
    success: "success",
  },
  login: (user, userRef, setLoginPage, history, setLocalUser = false) => {
    userRef.current = user;
    setLocalUser &&
      localStorage.setItem("con_manager_user", JSON.stringify(user));
    history.push("/condos");
    setLoginPage(authHandler.states.success);
  },
  onLoginRequest: async (username, pw, userRef, history, setLoginPage) => {
    // Getting response from server
    const res = await data.send("users", "login", { username, pw });

    if (res.users) {
      authHandler.login(
        { username, ...res.users[0] },
        userRef,
        setLoginPage,
        history,
        true
      );
    } else {
      window.setTimeout(() => {
        setLoginPage(authHandler.states.idle);
      }, 1200);
      setLoginPage(authHandler.states.invalid);
    }
  },
  checkStatus: () => localStorage.getItem("con_manager_user"),
  logout: (history) => {
    localStorage.removeItem("con_manager_user");
    history.replace("/login");

    // setLoginPage(authHandler.states.idle);
  },
};

const useLoginPersistence = (userRef, setLoginPage, history) => {
  return React.useEffect(() => {
    const localStorageUser = authHandler.checkStatus();

    localStorageUser &&
      authHandler.login(
        JSON.parse(localStorageUser),
        userRef,
        setLoginPage,
        history
      );
  }, []);
};

// Checks sidebarLayoutStatus
const sidebarLayoutOnLoad = (
  sessionStorage,
  layoutInStorage = JSON.parse(sessionStorage.getItem("sidebar_layout_on_load"))
) => (layoutInStorage !== null ? layoutInStorage : true);

// Pages handler
const pages = {
  Condos: () => <Condos />,
  Postings: () => <Postings />,
  Threads: () => <Threads />,
  Polls: () => <Polls />,
  Activities: () => <Activities />,
  Reviews: () => <Reviews />,
  Email: () => <Email />,
  Financial: () => <Financial />,
  Meetings: () => <Meetings />,
};
const menus = {
  Ads: ["Condos", "Postings"],
  Social: ["Threads", "Polls", "Activities", "Reviews", "Email"],
  Management: ["Financial", "Meetings"],
};

//[FUNCTIONAL COMPONENTS]
const AppContainer = () => {
  const [loginPage, setLoginPage] = React.useState(authHandler.states.idle);
  const [showUserMod, setShowUserMod] = React.useState(false);
  const userRef = React.useRef(null);
  const pageRef = React.useRef(null);

  const [associations, setAssociations] = React.useState([]);

  const history = useHistory();
  const location = useLocation();

  const toggleSidebar = () => {
    // setLayout(!layout);
    const willOpen = !pageRef.current.classList.contains("open");

    sessionStorage.setItem("sidebar_layout_on_load", JSON.stringify(willOpen));

    pageRef.current.className = `page-container ${
      willOpen ? "open" : "closed"
    }`;
  };

  const initiallyExpanded = sidebarLayoutOnLoad(sessionStorage);

  // Logs in the user if session is active
  useLoginPersistence(userRef, setLoginPage, history);

  const updateAssociations = async () => {
    const res = await data.send("associations", "get");

    setAssociations(res.associations);
    // if (!selectedAssociation) {
    //   setSelectedAssociation(res.associations[0]);
    // }
  };
  React.useEffect(() => {
    updateAssociations();
  }, []);

  return (
    <MainContext.Provider value={{ user: userRef }}>
      {authHandler.checkStatus() ? (
        !Object.keys(pages)
          .map((key) => `/${key}`)
          .includes(location.pathname) && <Redirect to="/condos" />
      ) : (
        <Redirect to="/login" />
      )}
      <div className="main-container">
        <Switch>
          <Route path="/login">
            <LoginContainer
              {...{
                loginStates: authHandler.states,
                setLoginPage,
                handleLogin: (username, pw) =>
                  authHandler.onLoginRequest(
                    username,
                    pw,
                    userRef,
                    history,
                    setLoginPage
                  ),
                invalidLogin: loginPage === authHandler.states.invalid,
              }}
            />
          </Route>
          <Route path="/admin">
            <AdminContainer
              {...{
                loginStates: authHandler.states,
                setLoginPage,
                handleLogin: (username, pw) =>
                  authHandler.onLoginRequest(
                    username,
                    pw,
                    userRef,
                    history,
                    setLoginPage
                  ),
                invalidLogin: loginPage === authHandler.states.invalid,
              }}
            />
          </Route>
          {loginPage === authHandler.states.success &&
            Object.values(menus)
              .flat()
              .map((elem) => {
                return (
                  <Route key={uuid()} exact path={`/${elem.toLowerCase()}`}>
                    {authHandler.checkStatus() === null ? (
                      <Redirect from="*" to="/login" />
                    ) : (
                      <div
                        ref={pageRef}
                        className={`page-container ${
                          initiallyExpanded ? "open" : "closed"
                        }`}
                      >
                        <Header
                          title={
                            associations?.find(
                              (elem) =>
                                elem?.asso_id === userRef.current.asso_id
                            )?.asso_name
                          }
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
                              onClick={() => authHandler.logout(history)}
                            />,
                          ]}
                        />
                        <div
                          ref={pageRef}
                          className={`page ${
                            initiallyExpanded ? "showSidebar" : ""
                          }`}
                        >
                          {pages[elem]()}
                        </div>
                        <Sidebar
                          {...{
                            currentPage: elem,
                            sidebarRef: null,
                            setCurrentPage: () => null,
                            handleSidebarToggle: toggleSidebar,
                            showUserMod: false,
                            setShowUserMod,
                            menus,
                            user: userRef,
                          }}
                        />
                        {showUserMod && (
                          <UserModModal
                            user={userRef}
                            onClose={() => setShowUserMod(false)}
                          />
                        )}
                      </div>
                    )}
                  </Route>
                );
              })}
        </Switch>
      </div>
    </MainContext.Provider>
  );
};

//[EXPORTS]
export default AppContainer;

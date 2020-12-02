// [IMPORTS]
// node_modules
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
// imports.js
import {
  D,
  Sidebar,
  Ads,
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
} from "../../imports";
// .scss
import "./PageContainer.scss";

const pages = {
  Ads: () => <Ads />,
  Postings: () => <Postings />,
  Threads: () => <Threads />,
  Polls: () => <Polls />,
  Activities: () => <Activities />,
  Reviews: () => <Reviews />,
  Email: () => <Email />,
  Financial: () => <Financial />,
  Contracts: () => <Contracts />,
  Meetings: () => <Meetings />,
};

const menus = {
  Marketing: ["Ads", "Postings"],
  Social: ["Threads", "Polls", "Activities", "Reviews", "Email"],
  Management: ["Financial", "Contracts", "Meetings"],
};

export const MainContext = React.createContext({
  user: {},
});

const PageContainer = (props) => {
  const { user, handleLogOut } = props;
  const [currentPage, setCurrentPage] = React.useState({
    name: "Ads",
    elem: pages.Ads(),
  });
  const pageRef = React.useRef(null);
  const sidebarRef = React.useRef(null);

  const [showUserMod, setShowUserMod] = React.useState(false);

  const handleSidebarToggle = () => {
    console.log("hello");
    pageRef.current.className = `page ${
      !pageRef.current.classList.contains("showSidebar") ? "showSidebar" : ""
    }`;
    console.log(sidebarRef.current);
    sidebarRef.current.className = `sidebar ${
      sidebarRef.current.classList.contains("open") ? "closed" : "open"
    }`;
  };

  const handleSidebarState = (name) => {
    setCurrentPage({
      name: name,
      elem: pages[name],
    });
  };

  const defaultContext = { user };

  const actions = [
    <Button
      content={{ show: "LOG OUT" }}
      style={{
        show: { fontSize: "20px", height: "40px", lineHeight: "40px" },
      }}
      onClick={() => handleLogOut()}
    />,
  ];

  return (
    <Router>
      <MainContext.Provider value={defaultContext}>
        <D cn={`page-container`}>
          <Header title={currentPage.name} actions={actions} />
          <D ref={pageRef} cn={`page`}>
            <Switch>
              {Object.values(menus)
                .flat()
                .map((elem) => {
                  return (
                    <Route key={uuid()} path={`/${elem.toLowerCase()}`}>
                      {pages[elem]()}
                    </Route>
                  );
                })}
            </Switch>
          </D>
          <Sidebar
            {...{
              currentPage: currentPage.name,
              sidebarRef: sidebarRef,
              setCurrentPage: handleSidebarState,
              handleSidebarToggle,
              showUserMod,
              setShowUserMod,
              menus,
              user,
            }}
          />
          {showUserMod && (
            <UserModModal user={user} onClose={() => setShowUserMod(false)} />
          )}
        </D>
      </MainContext.Provider>
    </Router>
  );
};

export default PageContainer;

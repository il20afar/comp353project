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
  UserModModal,
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

const PageContainer = (props) => {
  const { user } = props;
  const [currentPage, setCurrentPage] = React.useState({
    name: "Ads",
    elem: pages.Ads(),
  });
  const [showSidebar, setShowSidebar] = React.useState(false);

  const [showUserMod, setShowUserMod] = React.useState(false);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  const handleSidebarState = (name) => {
    console.log(name, pages);
    setCurrentPage({
      name: name,
      elem: pages[name],
    });
  };

  return (
    <Router>
      <D cn={`page-container${showSidebar ? " showSidebar" : ""}`}>
        <D cn="page">
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
            show: showSidebar,
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
    </Router>
  );
};

export default PageContainer;

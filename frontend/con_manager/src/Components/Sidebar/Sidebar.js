import React from "react";
import { Fade as Hamburger } from "hamburger-react";
import { D, UserIcon, UserIconMod } from "../../imports";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import "./Sidebar.scss";
import "../../Styles/Utils.scss";

const Menu = (props) => {
  const { title, sections = [], onSelect, currentPage } = props;
  return (
    <D cn="menu">
      <D cn="title">{title}</D>
      <D cn="sections-container">
        {sections.map((sec) => {
          const isCurrent = currentPage === sec;
          return (
            <Link key={uuid()} to={sec.toLowerCase()}>
              <D
                cn={`menu-section${isCurrent ? " current" : ""}`}
                key={sec}
                onClick={() => onSelect(sec)}
              >
                {isCurrent && <D cn="current-dot">·</D>}
                {sec}
              </D>
            </Link>
          );
        })}
      </D>
    </D>
  );
};

const Sidebar = (props) => {
  const {
    currentPage,
    setCurrentPage,
    show,
    handleSidebarToggle,
    showUserMod,
    setShowUserMod,
    menus,
    user,
  } = props;
  const onSelect = (key) => {
    setCurrentPage(key);
  };

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <D cn={`sidebar ${show ? "open" : "closed"}`}>
      <D cn="hamburger-container">
        <Hamburger
          className="hamburger"
          toggled={show}
          toggle={() => handleSidebarToggle()}
          color="white"
        />
      </D>
      <D cn="user-mod-container" onClick={() => setShowUserMod(!showUserMod)}>
        <D cn="username-wrapper">{user.current.username}</D>
        <D cn="user-wrapper">
          <UserIcon />
        </D>
      </D>
      <D cn="menus-wrapper">
        <D cn="menus">
          {Object.entries(menus).map(([title, sections]) => (
            <Menu
              key={uuid()}
              onSelect={onSelect}
              {...{ currentPage, title, sections }}
            />
          ))}
        </D>
      </D>
    </D>
  );
};

export default Sidebar;

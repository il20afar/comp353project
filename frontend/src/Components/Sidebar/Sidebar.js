import React from "react";
import { Fade as Hamburger } from "hamburger-react";
import { D, UserIcon } from "../../imports";
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
    sidebarRef,
    initiallyExpanded,
    handleSidebarToggle,
    showUserMod,
    setShowUserMod,
    menus,
    user,
  } = props;
  const closeSidebarOnMenuClick = React.useRef(false);

  const onSelect = (key) => {
    setCurrentPage(key);
    closeSidebarOnMenuClick.current && handleSidebarToggle(); // Close sidebar if width < 600
  };

  React.useEffect(() => {
    // Tells the component to close the sidebar on menu click if window width < 600
    const shouldCloseSidebarOnMenuToggle = (e, w = e.target.innerWidth) => {
      if (w < 600 && !closeSidebarOnMenuClick.current) {
        closeSidebarOnMenuClick.current = true;
      } else if (w > 600 && closeSidebarOnMenuClick.current) {
        closeSidebarOnMenuClick.current = false;
      }
    };
    window.addEventListener("resize", shouldCloseSidebarOnMenuToggle);

    return () => {
      window.removeEventListener("resize", shouldCloseSidebarOnMenuToggle);
    };
  }, []);

  const [hamburgerShow, setHamburgerShow] = React.useState(false);

  return (
    <D ref={sidebarRef} cn={`sidebar`}>
      <D cn="hamburger-container">
        <Hamburger
          className="hamburger"
          toggled={hamburgerShow}
          toggle={() => {
            setHamburgerShow(!hamburgerShow);
            handleSidebarToggle();
          }}
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

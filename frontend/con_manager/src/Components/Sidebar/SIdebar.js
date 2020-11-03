import React from "react";
import { Fade as Hamburger } from "hamburger-react";
import { D } from "../../imports";
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
            <D
              cn={`menu-section${isCurrent ? " current" : ""}`}
              key={sec}
              onClick={() => onSelect(sec)}
            >
              {isCurrent && <D cn="current-dot">·</D>}
              {sec}
            </D>
          );
        })}
      </D>
    </D>
  );
};

const Sidebar = (props) => {
  const { currentPage, setCurrentPage, menus } = props;
  const [show, setShow] = React.useState(false);
  const onSelect = (key) => {
    setCurrentPage(key);
  };

  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <D cn={`sidebar ${show ? "open" : "closed"}`}>
      <D cn="hamburger-container">
        <Hamburger className="hamburger" toggled={show} toggle={setShow} />
      </D>
      <D cn="menus-wrapper">
        <D cn="menus">
          {Object.entries(menus).map(([title, sections]) => (
            <Menu
              key={title}
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

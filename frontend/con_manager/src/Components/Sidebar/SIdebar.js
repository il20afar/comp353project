import React, { useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { useState } from "react";
import { D } from "../../Utils/Utils";
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
  const { currentPage, setCurrentPage } = props;
  const [show, setShow] = useState(true);
  const onSelect = (key) => {
    setCurrentPage(key);
  };

  useEffect(() => {
    return () => {};
  }, []);

  const menus = {
    Marketing: ["Ads", "Postings"],
    Social: ["Live Threads", "Polls", "Activities", "Reviews", "Email"],
    Management: ["Financial", "Contracts", "Meetings"],
  };

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

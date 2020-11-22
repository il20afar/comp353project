import React from "react";
import { v4 as uuid } from "uuid";

import "./Header.scss";
import "../../Styles/Utils.scss";

const Header = (props) => {
  const { title = null, showSidebar, actions = [], height = "70px" } = props;

  return (
    <div
      style={{ height }}
      className={`header${showSidebar ? " sidebar-open" : ""}`}
    >
      {title && <div className="title-container">{title}</div>}{" "}
      <div className="actions-container">
        {actions.map((elem) => (
          <div key={uuid()} className="action-wrapper">
            {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;

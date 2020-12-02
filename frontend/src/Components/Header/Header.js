import React from "react";
import { v4 as uuid } from "uuid";

import "./Header.scss";
import "../../Styles/Utils.scss";

const Header = (props) => {
  const {
    keyName = "",
    title = null,
    showSidebar,
    actions = [],
    height = "70px",
    ...rest
  } = props;

  console.log(actions[0].props.key);
  return (
    <div
      style={{ height }}
      className={`header ${showSidebar ? " sidebar-open" : ""}`}
      {...rest}
    >
      {title && <div className="title-container">{title}</div>}{" "}
      <div className="actions-container">
        {actions.map((elem, index) => (
          <div
            key={keyName ? `${keyName}${index}` : uuid()}
            className="action-wrapper"
          >
            {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;

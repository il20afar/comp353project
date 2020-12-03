import React from "react";
import { v4 as uuid } from "uuid";

import "./Header.scss";
import "../../Styles/Utils.scss";

const Header = React.forwardRef((props, ref) => {
  const {
    keyName = "",
    title = null,
    showSidebar,
    actions = [],
    height = "70px",
    ...rest
  } = props;

  return (
    <div
      style={{ height }}
      className={`header ${showSidebar ? " sidebar-open" : ""}`}
      ref={ref}
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
});

export default Header;

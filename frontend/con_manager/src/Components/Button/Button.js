import React from "react";
import { D } from "../../imports";
import "./Button.scss";
import "../../Styles/Utils.scss";

const Button = (props) => {
  const {
    type = "static",
    style = { show: {}, hide: {} },
    content = { show: "SHOW", hide: "HIDE" },
    onClick,
  } = props;

  const [show, setShow] = React.useState(true);

  const handlers = {
    onClick: (e) => {
      onClick(!show);
      type === "dynamic" && setShow(!show);
    },
  };

  return (
    <D
      cn={`button ${type} ${show ? "show" : "hide"}`}
      onClick={handlers.onClick}
      style={show ? style.show : style.hide ?? style.show}
    >
      {show ? content.show : content.hide}
    </D>
  );
};

export default Button;

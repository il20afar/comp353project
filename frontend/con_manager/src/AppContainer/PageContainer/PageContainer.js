import React from "react";
import { forwardRef, useState, useEffect, useRef } from "react";

import { D } from "../../Utils/Utils";

import "../../Styles/Utils.scss";
import "./PageContainer.scss";

const PageContainer = (props) => {
  const { user } = props;
  console.log(user);
  return (
    <D cn="page-container">
      <D>Hello, {user.current.name}</D>
    </D>
  );
};

export default PageContainer;

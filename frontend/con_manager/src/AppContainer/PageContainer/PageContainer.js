import React from "react";
import { forwardRef, useState, useEffect, useRef } from "react";

import { D } from "../../Utils/Utils";
import Sidebar from "../../Components/Sidebar/Sidebar";

import "../../Styles/Utils.scss";
import "./PageContainer.scss";

const PageContainer = (props) => {
  const { user } = props;
  const [currentPage, setCurrentPage] = useState("Ads");
  const menus = {
    Marketing: ["Ads", "Postings"],
    Social: ["Live Threads", "Polls", "Activities", "Reviews", "Email"],
    Management: ["Financial", "Contracts", "Meetings"],
  };
  return (
    <D cn="page-container">
      <Sidebar {...{ currentPage, setCurrentPage, menus }} />
      <D cn="username">Hello, {user.current.name}</D>
      <D cn="page">{currentPage}</D>
    </D>
  );
};

export default PageContainer;

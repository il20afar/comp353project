import React from "react";
import { D, Sidebar, User } from "../../imports";

import "./PageContainer.scss";

const PageContainer = (props) => {
  const { user } = props;
  const [currentPage, setCurrentPage] = React.useState("Ads");
  const menus = {
    Marketing: ["Ads", "Postings"],
    Social: ["Live Threads", "Polls", "Activities", "Reviews", "Email"],
    Management: ["Financial", "Contracts", "Meetings"],
  };
  return (
    <D cn="page-container">
      <Sidebar {...{ currentPage, setCurrentPage, menus }} />
      <User user={user} />
      <D cn="page">{currentPage}</D>
    </D>
  );
};

export default PageContainer;

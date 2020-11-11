import React from "react";
import { D, Sidebar, User, Ads } from "../../imports";

import "./PageContainer.scss";
import Reviews from "./Pages/Social/Reviews.js";

const pages = {
  Ads: <Ads />,
  Reviews: <Reviews />,
};

const PageContainer = (props) => {
  const { user } = props;
  const [currentPage, setCurrentPage] = React.useState({
    name: "Ads",
    elem: <Ads />,
  });

  const handleSidebarState = (name) => {
    console.log(name, pages);
    setCurrentPage({
      name: name,
      elem: pages[name],
    });
  };

  const menus = {
    Marketing: ["Ads", "Postings"],
    Social: ["Live Threads", "Polls", "Activities", "Reviews", "Email"],
    Management: ["Financial", "Contracts", "Meetings"],
  };

  return (
    <D cn="page-container">
      <Sidebar
        {...{
          currentPage: currentPage.name,
          setCurrentPage: handleSidebarState,
          menus,
        }}
      />
      <User user={user} />
      <D cn="page">{currentPage.elem}</D>
    </D>
  );
};

export default PageContainer;

import React from "react";

import {
  D,
  MainContext,
  TextBox,
  data,
  Button,
  Header,
  AdThumbnail,
  InputModal,
  SearchBar,
  HighlightedContent,
  LoadContainer,
} from "../../imports";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import { v4 as uuid } from "uuid";

import AdDetail from "./Helpers/AdDetail";
import "./Postings.scss";

const PostingDetailedContainer = (props) => {
  const { type, ad = {}, view, setView, editable } = props;

  const { user } = React.useContext(MainContext);

  const handlers = {
    edit: () => {
      setView("edit");
    },
    confirm: () => {
      setView("menu");
    },
    close: async (ad) => {
      setView("menu");
    },
  };

  const inputAd =
    view === "create"
      ? {
          title: "",
          ad_city: "",
          ad_price: "",
          ad_desc: "",
          visibility: "",
          pictures: "",
        }
      : ad;

  console.log("userid: ", user.current.user_id, "  Creatorid: ", inputAd);

  return (
    <div className="ad-detail-container">
      <AdDetail
        {...{
          type,
          view,
          editable: editable && user.current.user_id === inputAd.creator_id,
          ad: inputAd,
          onEdit: handlers.edit,
          onClose: handlers.close,
          user_id: user.current.user_id,
        }}
      />
    </div>
  );
};

const PostingsContainer = (props) => {
  const { user, visiblePostings, type, setView } = props;

  return (
    <div className={`postings-container ${type}`}>
      {visiblePostings.length === 0 ? (
        <div className={`no-postings-shown ${type}`}></div>
      ) : (
        visiblePostings
          .sort((a, b) => b.ad_id - a.ad_id)
          .map((elem) => {
            const { pictures, title, ad_city, ad_price } = elem;

            return (
              <AdThumbnail
                key={uuid()}
                type="posting"
                images={pictures.split(", ")[0]}
                title={title}
                city={ad_city}
                price={ad_price}
                onClick={() => setView(elem)}
              />
            );
          })
      )}
    </div>
  );
};

const Postings = () => {
  const { user } = React.useContext(MainContext);

  const [visibleItemType, setVisibleItemsType] = React.useState("both");

  // "menu", "detailed", "edit", "create"
  const [view, setView] = React.useState("menu");

  // This is a list of all visible ads
  const [visiblePostings, setVisiblePostings] = React.useState([]);

  // If ad is selected, it means we return the detailed view
  const [selectedPosting, setSelectedPosting] = React.useState({});

  const handlers = {
    actions: {
      updatePostings: async (visibility) => {
        const res = await data.send("ads", "get", {
          visibility: "public",
        });

        setVisiblePostings(
          res.ads.filter((ad) => ad.ad_type !== "condo") || []
        );
      },
      create: () => {
        setView("create");
      },
    },

    adGrid: {
      open: (ad) => {
        setSelectedPosting(ad);
        setView("specific");
      },
    },
  };

  const actions = [
    ...["items", "both", "services"].map((elem) => {
      const color =
        visibleItemType === "items"
          ? "rgb(86, 116, 224)"
          : visibleItemType === "services"
          ? "rgb(109, 75, 148)"
          : "rgb(98,96,186)";
      const selectedStyling =
        visibleItemType === elem
          ? {
              fontWeight: "700px",
              backgroundColor: color,
              border: `2px solid ${color}`,
              color: "white",
            }
          : {};
      return (
        <Button
          content={{ show: elem }}
          style={{
            show: {
              width: "140px",
              textTransform: "capitalize",
              ...selectedStyling,
            },
          }}
          onClick={() => setVisibleItemsType(elem)}
        />
      );
    }),
    <Button
      content={{ show: "Create +" }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onClick={() => setView("create")}
    />,
  ];

  React.useEffect(() => {
    handlers.actions.updatePostings();
  }, [view]);

  console.log(visiblePostings);

  return (
    <div className="postings">
      {view === "menu" && <Header height="80px" actions={actions} />}
      {view === "menu" ? (
        <div className={`postings-window ${visibleItemType}`}>
          {visiblePostings.length === 0 ? (
            <LoadContainer
              type="ThreeDots"
              color="rgb(98,96,186)"
              style={{ gridColumn: "1 / span 2" }}
              height="100px"
              width="100px"
            />
          ) : (
            <>
              <PostingsContainer
                user={user}
                visiblePostings={visiblePostings.filter(
                  (elem) => elem.ad_type === "item_sale"
                )}
                type="closed"
                setView={handlers.adGrid.open}
              />
              <PostingsContainer
                user={user}
                visiblePostings={visiblePostings.filter(
                  (elem) => elem.ad_type === "service"
                )}
                type="open"
                setView={handlers.adGrid.open}
              />
            </>
          )}
        </div>
      ) : (
        <PostingDetailedContainer
          type="posting"
          ad={selectedPosting}
          editable={true}
          view={view}
          updatePostings={handlers.actions.updatePostings}
          setView={setView}
        />
      )}
    </div>
  );
};

export default Postings;

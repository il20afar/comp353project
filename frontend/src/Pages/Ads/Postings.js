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
  const { ad = {}, view, setView, editable, user_id } = props;

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

  return (
    <div className="ad-detail-container">
      <AdDetail
        {...{
          view,
          editable: editable && user_id === ad.creator_id,
          ad: inputAd,
          onEdit: handlers.edit,
          onClose: handlers.close,
          user_id,
        }}
      />
    </div>
  );
};

const PostingsContainer = (props) => {
  const { user, visiblePostings, type } = props;

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
              />
            );
          })
      )}
    </div>
  );
};

const Postings = () => {
  const { user } = React.useContext(MainContext);

  const [visibility, setVisiblity] = React.useState("both");

  // "menu", "detailed", "edit", "create"
  const [view, setView] = React.useState("menu");

  // This is a list of all visible ads
  const [visiblePostings, setVisiblePostings] = React.useState([]);

  // If ad is selected, it means we return the detailed view
  const [selectedAd, setSelectedAd] = React.useState({});

  // This is the current visibility filter
  const [visibilityFilter, setVisibilityFilter] = React.useState(visibility);

  const handlers = {
    actions: {
      updatePostings: async (visibility) => {
        const res = await data.send("ads", "get", {
          visibility: visibility.toLowerCase(),
        });
        console.log(res.ads);

        setVisiblePostings(
          res.ads.filter((ad) => ad.ad_type === "condo") || []
        );
      },

      filter: (eventKey) => {
        handlers.actions.updatePostings(eventKey);
        setVisibilityFilter(eventKey);
      },
      create: () => {
        setView("create");
      },
    },

    adGrid: {
      open: (adNumber) => {
        setSelectedAd(
          visiblePostings.find((ad) => ad.ad_id === adNumber) || {}
        );
        setView("specific");
      },
    },
  };

  const updatePostings = async () => {
    const res = await data.send("ads", "get", {
      visibility: "public",
    });

    console.log(res);
    setVisiblePostings(res.ads.filter((elem) => elem.ad_type !== "condo"));
  };

  React.useEffect(() => {
    window.setTimeout(() => {
      updatePostings();
    }, 200);
  }, []);

  const actions = [
    ...["items", "both", "services"].map((elem) => {
      const color =
        visibility === "items"
          ? "rgb(86, 116, 224)"
          : visibility === "services"
          ? "rgb(109, 75, 148)"
          : "rgb(98,96,186)";
      const selectedStyling =
        visibility === elem
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
          onClick={() => setVisiblity(elem)}
        />
      );
    }),
    <Button
      content={{ show: "Create +" }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onClick={() => setView("create")}
    />,
  ];

  return (
    <div className="postings">
      <Header key={uuid()} height="80px" actions={actions} />

      {view === "create" ? (
        <PostingDetailedContainer
          updatePostings={updatePostings}
          setView={setView}
        />
      ) : (
        <div className={`postings-window ${visibility}`}>
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
              />
              <PostingsContainer
                user={user}
                visiblePostings={visiblePostings.filter(
                  (elem) => elem.ad_type === "service"
                )}
                type="open"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Postings;

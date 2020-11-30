import React from "react";
import { v4 as uuid } from "uuid";
import { Header, Button, data } from "../../imports";

import Condo from "./Condo";
import "./Ads.scss";
import AdDetail from "./AdDetail";
import { MainContext } from "../../AppContainer/PageContainer/PageContainer";

const arr = [
  "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg", //part of "Pictures"
  ,
  "https://torontostoreys.com/wp-content/uploads/2018/01/roseanne-condo-770x514.jpg",
  ,
  "https://www.moneyunder30.com/wp-content/uploads/2008/07/so-you-wanna-buy-a-condo-five-questions-to-ask-before-buying-648x364-c-default.jpg",
  ,
  "https://images.unsplash.com/photo-1539693010221-cd218dfe6565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
];

const makeGeneralAd = (adId, img, city, price, title, type, setDetailsAd) => {
  return (
    <div
      key={uuid()}
      className="ad-container"
      onClick={() => setDetailsAd(adId)}
    >
      <Condo
        {...{
          className: "detail",
          adId: Number.parseInt(adId),
          img,
          city,
          price,
          title,
          type,
        }}
      />
    </div>
  );
};

const AdGeneralContainer = (props) => {
  const { ads, setDetailsAd } = props;

  return (
    <>
      <div className="ad-general-container">
        {ads.map((ad) => {
          return makeGeneralAd(
            ad.ad_id,
            ad.pictures.replace(" ", "").split(",")[0],
            ad.ad_city,
            ad.ad_price,
            ad.title,
            ad.ad_type,
            setDetailsAd
          );
        })}
      </div>
    </>
  );
};

const AdDetailContainer = (props) => {
  const { ad = {}, view, setView, editable, user_id } = props;

  const handlers = {
    edit: () => {
      setView("edit");
    },
    confirm: () => {
      setView("general");
    },
    close: async (ad) => {
      setView("general");
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

const Ads = (props) => {
  const { type = "page", visibility = "public" } = props;

  const { user } = React.useContext(MainContext);

  // "general", "detailed", "edit", "create"
  const [view, setView] = React.useState("general");

  // This is a list of all visible ads
  const [visibleAds, setVisibleAds] = React.useState([]);

  // If ad is selected, it means we return the detailed view
  const [selectedAd, setSelectedAd] = React.useState({});

  // This is the current visibility filter
  const [visibilityFilter, setVisibilityFilter] = React.useState(visibility);

  const handlers = {
    actions: {
      updateAds: async (visibility) => {
        const res = await data.send("ads", "get", {
          visibility: visibility.toLowerCase(),
        });
        setVisibleAds(res.ads || []);
      },

      filter: (eventKey) => {
        handlers.actions.updateAds(eventKey);
        setVisibilityFilter(eventKey);
      },
      create: () => {
        setView("create");
      },
    },

    adGrid: {
      open: (adNumber) => {
        setSelectedAd(visibleAds.find((ad) => ad.ad_id === adNumber) || {});
        setView("specific");
      },
    },
  };

  const actions = [
    <Button
      content={{ show: visibilityFilter, hide: "√" }}
      style={{
        show: { width: "200px", textTransform: "capitalize" },
        hide: { width: "200px", textTransform: "capitalize" },
      }}
      dropdown={[
        { elem: "Classified", eventKey: "classified" },
        { elem: "General", eventKey: "general" },
        { elem: "Public", eventKey: "public" },
      ]}
      onSelect={handlers.actions.filter}
    />,
    <Button
      content={{ show: "Create +" }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onClick={handlers.actions.create}
    />,
  ];

  React.useEffect(() => {
    handlers.actions.updateAds(visibilityFilter);
  }, [view]);

  return (
    <div className="ads">
      {type === "page" && view === "general" && (
        <Header height="40px" actions={actions} />
      )}
      {view === "general" ? (
        <AdGeneralContainer
          ads={visibleAds}
          setDetailsAd={handlers.adGrid.open}
        />
      ) : (
        <AdDetailContainer
          ad={selectedAd}
          editable={type !== "login"}
          user_id={user.current?.user_id}
          view={view}
          setView={setView}
        />
      )}
    </div>
  );
};

export default Ads;

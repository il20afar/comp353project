import React from "react";
import { v4 as uuid } from "uuid";
import { Header, Button, data, MainContext, AdThumbnail } from "../../imports";

import "./Condos.scss";
import AdDetail from "./Helpers/AdDetail";

const makeGeneralAd = (adId, img, city, price, title, type, setDetailsAd) => {
  return (
    <div
      key={uuid()}
      className="ad-container"
      onClick={() => setDetailsAd(adId)}
    >
      <AdThumbnail
        type="condo"
        images={img}
        title={title}
        city={city}
        price={price}
      />
    </div>
  );
};

const AdGeneralContainer = (props) => {
  const { ads, setDetailsAd } = props;

  return (
    <>
      <div className="ad-menu-container">
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

const Condos = (props) => {
  const { type = "page-view", visibility = "public" } = props;

  const { user } = React.useContext(MainContext);

  // "menu", "detailed", "edit", "create"
  const [view, setView] = React.useState("menu");

  // This is a list of all visible ads
  const [visibleCondos, setVisibleCondos] = React.useState([]);

  // If ad is selected, it means we return the detailed view
  const [selectedAd, setSelectedAd] = React.useState({});

  // This is the current visibility filter
  const [visibilityFilter, setVisibilityFilter] = React.useState(visibility);

  const handlers = {
    actions: {
      updateCondos: async (visibility) => {
        const res = await data.send("ads", "get", {
          visibility:
            visibility.toLowerCase() === "classified"
              ? Number.parseInt(user.current.asso_id)
              : visibility.toLowerCase(),
        });
        console.log(res);

        setVisibleCondos(res.ads.filter((ad) => ad.ad_type === "condo") || []);
      },

      filter: (eventKey) => {
        handlers.actions.updateCondos(eventKey);
        setVisibilityFilter(eventKey);
      },
      create: () => {
        setView("create");
      },
    },

    adGrid: {
      open: (adNumber) => {
        setSelectedAd(visibleCondos.find((ad) => ad.ad_id === adNumber) || {});
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
    handlers.actions.updateCondos(visibilityFilter);
  }, [view]);

  return (
    <div className={`condos ${type}`}>
      {type === "page-view" && view === "menu" && (
        <Header height="80px" actions={actions} />
      )}
      {view === "menu" ? (
        <AdGeneralContainer
          ads={visibleCondos}
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

export default Condos;

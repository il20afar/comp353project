import React from "react";
import { v4 as uuid } from "uuid";
import { Header, Button, data } from "../../imports";

import Condo from "./Condo";
import "./Ads.scss";
import AdDetail from "./AdDetail";

const arr = [
  {
    adId: 316, //primary key
    img:
      "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg", //part of "Pictures"
    city: "Montreal", //part of "Description"
    price: "$520,000", //part of "Description"
    title: "2 and a half with furnitures", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
    creatorID: " ",
  },
  {
    adId: 251,
    img:
      "https://torontostoreys.com/wp-content/uploads/2018/01/roseanne-condo-770x514.jpg",
    city: "Montreal",
    price: "$650,000",
    title: "4 and a half condo near subway", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 103,
    img:
      "https://www.moneyunder30.com/wp-content/uploads/2008/07/so-you-wanna-buy-a-condo-five-questions-to-ask-before-buying-648x364-c-default.jpg",
    city: "Montreal",
    price: "$1450",
    title: "3 and a half apartment for rent", //?
    type: "Apartment", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 167,
    img:
      "https://images.unsplash.com/photo-1539693010221-cd218dfe6565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    city: "Ottawa",
    price: "$600,000",
    title: "2 and a half condo for sale", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 316, //primary key
    img:
      "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg", //part of "Pictures"
    city: "Montreal", //part of "Description"
    price: "$520,000", //part of "Description"
    title: "2 and a half with furnitures", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
    creatorID: " ",
  },
  {
    adId: 251,
    img:
      "https://torontostoreys.com/wp-content/uploads/2018/01/roseanne-condo-770x514.jpg",
    city: "Montreal",
    price: "$650,000",
    title: "4 and a half condo near subway", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 103,
    img:
      "https://www.moneyunder30.com/wp-content/uploads/2008/07/so-you-wanna-buy-a-condo-five-questions-to-ask-before-buying-648x364-c-default.jpg",
    city: "Montreal",
    price: "$1450",
    title: "3 and a half apartment for rent", //?
    type: "Apartment", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 167,
    img:
      "https://images.unsplash.com/photo-1539693010221-cd218dfe6565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    city: "Ottawa",
    price: "$600,000",
    title: "2 and a half condo for sale", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 316, //primary key
    img:
      "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg", //part of "Pictures"
    city: "Montreal", //part of "Description"
    price: "$520,000", //part of "Description"
    title: "2 and a half with furnitures", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
    creatorID: " ",
  },
  {
    adId: 251,
    img:
      "https://torontostoreys.com/wp-content/uploads/2018/01/roseanne-condo-770x514.jpg",
    city: "Montreal",
    price: "$650,000",
    title: "4 and a half condo near subway", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 103,
    img:
      "https://www.moneyunder30.com/wp-content/uploads/2008/07/so-you-wanna-buy-a-condo-five-questions-to-ask-before-buying-648x364-c-default.jpg",
    city: "Montreal",
    price: "$1450",
    title: "3 and a half apartment for rent", //?
    type: "Apartment", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 167,
    img:
      "https://images.unsplash.com/photo-1539693010221-cd218dfe6565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    city: "Ottawa",
    price: "$600,000",
    title: "2 and a half condo for sale", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 316, //primary key
    img:
      "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg", //part of "Pictures"
    city: "Montreal", //part of "Description"
    price: "$520,000", //part of "Description"
    title: "2 and a half with furnitures", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
    creatorID: " ",
  },
  {
    adId: 251,
    img:
      "https://torontostoreys.com/wp-content/uploads/2018/01/roseanne-condo-770x514.jpg",
    city: "Montreal",
    price: "$650,000",
    title: "4 and a half condo near subway", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 103,
    img:
      "https://www.moneyunder30.com/wp-content/uploads/2008/07/so-you-wanna-buy-a-condo-five-questions-to-ask-before-buying-648x364-c-default.jpg",
    city: "Montreal",
    price: "$1450",
    title: "3 and a half apartment for rent", //?
    type: "Apartment", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
  {
    adId: 167,
    img:
      "https://images.unsplash.com/photo-1539693010221-cd218dfe6565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    city: "Ottawa",
    price: "$600,000",
    title: "2 and a half condo for sale", //?
    type: "Condo", //(ad, item sale, service)
    visibility: " ", //(public, general, classified)
  },
];

const makeGeneralAd = (adId, img, city, price, title, type, setDetailsAd) => {
  return (
    <div className="ad-container" onClick={() => setDetailsAd(adId)}>
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
  const { setDetailsAd } = props;
  return (
    <>
      <div className="ad-general-container">
        {arr.map((obj) =>
          makeGeneralAd(
            obj.adId,
            obj.img,
            obj.city,
            obj.price,
            obj.title,
            obj.type,
            setDetailsAd
          )
        )}
      </div>
    </>
  );
};

const Ads = (props) => {
  const { advertisements } = props;
  const [detailedView, setDetailedView] = React.useState(-1);
  const [editView, setEditView] = React.useState(false);
  const [visibilityFilter, setVisibilityFilter] = React.useState("Public");
  const isCreatingAdd = React.useRef(false);

  const elem = arr.find((ad) => ad.adId === detailedView);
  const {
    ad_id = "",
    title = "",
    city = "",
    price = "",
    description = "",
    visibility = "",
    img = null,
  } = elem || {};
  console.log(elem, detailedView);

  const handlers = {
    actions: {
      filter: async (eventKey) => {
        console.log(eventKey);
        const res = await data.send("ads", "get", {
          visibility: eventKey.toLowerCase(),
        });
        if (res) {
          console.log(res);
        } else {
        }
      },
      create: async () => {
        isCreatingAdd.current = true;
      },
    },

    adGrid: {
      open: (adNumber) => {
        console.log(adNumber, detailedView);
        setDetailedView(adNumber);
      },
    },
    detailedView: {
      edit: () => {
        setEditView(true);
      },
      close: async (ad) => {
        if (isCreatingAdd.current) {
          const res = await data.send("ads", "get", ad);
        }

        if (editView) setEditView(false);
        setDetailedView(-1);
      },
    },
  };

  const actions = [
    <Button
      content={{ show: visibilityFilter, hide: "√" }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      dropdown={[
        { elem: "Classified", eventKey: "classified" },
        { elem: "General", eventKey: "general" },
        { elem: "Public", eventKey: "public" },
      ]}
      onSelect={handlers.actions.filter}
    />,
    <Button
      content={{ show: "Create +", hide: "√" }}
      style={{ show: { width: "200px" }, hide: { width: "200px" } }}
      onSelect={handlers.actions.filter}
    />,
  ];

  const ad = React.useRef({
    ad_id,
    title,
    city,
    price,
    description,
    visibility,
    img,
  });

  return (
    <div className="ads">
      {detailedView === -1 && <Header height="40px" actions={actions} />}
      {detailedView === -1 ? (
        <AdGeneralContainer setDetailsAd={handlers.adGrid.open} />
      ) : (
        <div className="ad-detail-container">
          <AdDetail
            {...{
              ad,
              onClose: handlers.detailedView.close,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Ads;

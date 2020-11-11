import React from "react";
import { D } from "../../../../imports";
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
    title: "2 and a half condo in with furnitures", //?
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
    title: "3 and a half apartment for rent only", //?
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
    <div onClick={() => setDetailsAd(adId)}>
      <Condo
        {...{ className: "detail", adId, img, city, price, title, type }}
      />
    </div>
  );
};

const makeDetailAd = (adId, img, city, price, title, type) => {
  return (
    <AdDetail
      {...{ className: "detail", adId, img, city, price, title, type }}
    />
  );
};

const General = (props) => {
  return (
    <>
      <header className="ads-head">Discover Your Future Home</header>
      <div className="containe">
        {arr.map((obj) =>
          makeGeneralAd(
            obj.adId,
            obj.img,
            obj.city,
            obj.price,
            obj.title,
            obj.type,
            props.setDetailsAd
          )
        )}
      </div>
    </>
  );
};

const Ads = (props) => {
  const { advertisements } = props;
  const [detailsAd, setDetailsAd] = React.useState(-1);
  const elem = arr.find((ad) => ad.adId === detailsAd);
  const { adId, img, city, price, title, type } = elem || {};
  return (
    <div className="ads">
      {detailsAd === -1 ? (
        <General setDetailsAd={setDetailsAd} />
      ) : (
        makeDetailAd(adId, img, city, price, title, type)
      )}
    </div>
  );
};

export default Ads;

import React from "react";
import { D } from "../../../../imports";
import Condo from './Condo';
import "./Ads.scss";
import AdDetail from "./AdDetail";


const Ads = (props) => {
  const { advertisements } = props;
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
  console.log(JSON.stringify(arr));

  const makeCondo = (adId, img, city, price) => {
    return <Condo {...{ className: "condoAd", adId, img, city, price }} />;
  };

  const makeDetail = (adId, img, city, price, title, type) => {
    return <AdDetail {...{ className: "detail", adId, img, city, price, title, type }} />;
  };

  return (
    <div className="ads">
      <header className="ads-head">Discover Your Future Home</header>
      <div className="containe">
        {arr.map((obj) => makeDetail(obj.adId, obj.img, obj.city, obj.price, obj.title,obj.type))}
      </div>
    </div>
  );
};

export default Ads;

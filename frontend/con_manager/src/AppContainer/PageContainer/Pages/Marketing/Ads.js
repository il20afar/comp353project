import React from "react";
import { D } from "../../../../imports";
import "./Ads.scss";
import Condo from "./Condo";

const Ads = (props) => {
  const { advertisements } = props;
  const arr = [
    {
      adId: 1, //primary key
      img:
        "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg", //part of "Pictures"
      city: "Montreal", //part of "Description"
      price: "$400,000", //part of "Description"
      title: " ", //?
      type: " ", //(ad, item sale, service)
      visibility: " ", //(public, general, classified)
      creatorID: " ",
    },
    {
      adId: 2,
      img:
        "https://torontostoreys.com/wp-content/uploads/2018/01/roseanne-condo-770x514.jpg",
      city: "Montreal", //part of "Description"
      price: "$650,000", //part of "Description"
      title: " ", //?
      type: " ", //(ad, item sale, service)
      visibility: " ", //(public, general, classified)
      creatorID: " ",
    },
    {
      adId: 3,
      img:
        "https://www.moneyunder30.com/wp-content/uploads/2008/07/so-you-wanna-buy-a-condo-five-questions-to-ask-before-buying-648x364-c-default.jpg",
      city: "Montreal", //part of "Description"
      price: "$725,000", //part of "Description"
      title: " ", //?
      type: " ", //(ad, item sale, service)
      visibility: " ", //(public, general, classified)
      creatorID: " ",
    },
    {
      adId: 4,
      img:
        "https://images.unsplash.com/photo-1539693010221-cd218dfe6565?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
      city: "Ottawa", //part of "Description"
      price: "$600,000", //part of "Description"
      title: " ", //?
      type: " ", //(ad, item sale, service)
      visibility: " ", //(public, general, classified)
      creatorID: " ",
    },
  ];
  console.log(JSON.stringify(arr));

  const makeCondo = (adId, img, city, price) => {
    return <Condo {...{ className: "condoAd", adId, img, city, price }} />;
  };

  return (
    <div className="ads">
      <header className="ads-head">Discover Your Future Home</header>
      <div className="container">
        {arr.map((obj) => makeCondo(obj.adId, obj.img, obj.city, obj.price))}
      </div>
    </div>
  );
};

export default Ads;

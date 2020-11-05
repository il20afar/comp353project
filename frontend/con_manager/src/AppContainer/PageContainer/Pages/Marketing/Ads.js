import React from "react";
import { D } from "../../../../imports";
import Condo from './Condo';
import "./Ads.scss";

const Ads = (props) => {
  const { advertisements } = props;
  const arr = [
    {
      adId: 1,
      img:
        "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg",
      city: "Montreal",
      price: "300003434",
    },
    {
      adId: 4,
      img:
        "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg",
      city: "Montreal",
      price: "100023432400",
    },
    {
      adId: 7,
      img:
        "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg",
      city: "Montreal",
      price: "13334200000",
    },
    {
      adId: 67,
      img:
        "https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/190501Tribeca111MurrayStMAINPIC.jpg",
      city: "Ottawa",
      price: "123400000",
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

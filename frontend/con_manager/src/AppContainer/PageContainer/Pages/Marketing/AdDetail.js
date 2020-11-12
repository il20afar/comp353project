import React from "react";
import "./AdDetail.scss";

const AdDetail = (props) => {
  const { title, img, adId, type, city, price, ...rest } = props;
  return (
    <div {...rest}>
      <header>
        <p>{title}</p>
      </header>

      <section>
        <nav>
          <img className="img-detail" src={img} />
        </nav>

        <description>
          <h1>Adverstment ID: {adId}</h1>
          <p>Type: {type}</p>
          <p>City: {city}</p>
          <p>Price: {price}</p>
        </description>
      </section>
    </div>
  );
};

export default AdDetail;

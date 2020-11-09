import React from "react";
import "./AdDetail.scss";

const AdDetail = (props) => {
  return (
    <div>
      <header>
        <p>{props.title}</p>
      </header>

      <section>
        <nav>
          <img className="img-detail" src={props.img} />
        </nav>

        <description>
          <h1>Adverstment ID: {props.adId}</h1>
          <p>Type: {props.type}</p>
          <p>City: {props.city}</p>
          <p>Price: {props.price}</p>
        </description>
      </section>
    </div>
  );
};

export default AdDetail;

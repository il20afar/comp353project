import React from "react";
import "./Condo.scss";
import { v4 as uuid } from "uuid";

const Condo = (props) => {
  return (
    <div key={uuid()} className="condo">
      <button className="box">
        <img className="img" src={props.img} />
        <div className="content">
          <p>{props.title} </p>
          <p>{props.price} </p>
        </div>
      </button>
    </div>
  );
};

export default Condo;

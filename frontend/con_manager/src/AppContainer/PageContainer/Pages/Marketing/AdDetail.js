import React from "react";
import "./AdDetail.scss";

const AdDetail = (props) => {
    return (
        <div className = "ad-detail">
            <img className = "img-detail" src= {props.img}/>
            <div className = "title-id-box">
            <p className = "title">{props.title}</p>
            <p className = "id">Adverstment ID: {props.adId}</p>
            </div>
            <p>Type: {props.type}</p>
            <p>City: {props.city}</p>
            <p>Price: {props.price}</p>
        </div>
    )


}

export default AdDetail;
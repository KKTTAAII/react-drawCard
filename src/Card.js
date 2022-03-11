import React from "react";
import "./Card.css";

const Card = ({ imageUrl, name }) => {
  return (
    <div className="Card">
      <img src={imageUrl} alt={name}></img>
    </div>
  );
};

export default Card;

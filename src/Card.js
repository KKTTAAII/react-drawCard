import React from "react";
import "./Card.css";

const Card = ({ imageUrl }) => {
  return (
    <div className="Card">
      <img src={imageUrl}></img>
    </div>
  );
};

export default Card;

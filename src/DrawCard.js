import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import "./DrawCard.css";

const DrawCard = () => {
  const [card, getCard] = useState([]);
  const [deckId, getDeckId] = useState("");
  const [cardLeft, getCardleft] = useState();

  useEffect(() => {
    const getNewDeck = async () => {
      const cardResult = await axios.get(
        "http://deckofcardsapi.com/api/deck/new/draw/"
      );
      const deckId = cardResult.data.deck_id;
      getDeckId(deckId);
    };
    getNewDeck();
  }, []);

  const drawACard = async () => {
    const deckOfCard = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/`
    );
    const cardImg = deckOfCard.data.cards[0].image;
    const numOfCardLeft = deckOfCard.data.remaining;
    console.log(deckOfCard);
    getCard([...card, cardImg]);
    getCardleft(numOfCardLeft);
  };

  return (
    <div className="DrawCard">
      <div>
        {" "}
        {card.map((card, id) => {
          return <Card imageUrl={card} key={id} />;
        })}
      </div>
      {cardLeft === 0 ? (
        <div className="DrawCard-card-out">Out Of Card</div>
      ) : (
        <button
          onClick={async () => await drawACard()}
          className="DrawCard-button"
        >
          Draw a Card
        </button>
      )}
    </div>
  );
};

export default DrawCard;

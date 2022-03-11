import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./DrawCard.css";

const BASE_URL = "http://deckofcardsapi.com/api/deck";

const DrawCard = () => {
  const timerId = useRef();
  const [card, getCard] = useState([]);
  const [deckId, getDeckId] = useState("");
  const [autoDraw, setAutoDraw] = useState(false);
  const [cardLeft, getCardleft] = useState();

  useEffect(() => {
    const getNewDeck = async () => {
      const cardResult = await axios.get(`${BASE_URL}/new/draw/`);
      const deckId = cardResult.data.deck_id;
      getDeckId(deckId);
    };
    getNewDeck();
  }, []);

  useEffect(() => {
    const drawCard = async () => {
      try {
        const deckOfCard = await axios.get(`${BASE_URL}/${deckId}/draw/`);
        getCardleft(deckOfCard.data.remaining);

        if (deckOfCard.data.remaining === 0) {
          setAutoDraw(false);
          alert("Refresh to restart");
        }

        const { cards } = deckOfCard.data;
        const { image } = cards[0];
        const { suit } = cards[0];
        const { value } = cards[0];
        getCard([
          ...card,
          {
            img: image,
            name: suit + " " + value,
          },
        ]);
      } catch (err) {
        alert(err);
      }
    };

    if (autoDraw && !timerId.current) {
      timerId.current = setInterval(async () => {
        await drawCard();
      }, 1000);
    }

    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
    };
  }, [autoDraw, setAutoDraw, deckId]);

  const toggleAutoDraw = () => {
    setAutoDraw(auto => !auto);
  };

  const cards = card.map((card, id) => {
    return <Card imageUrl={card.img} key={id} name={card.name} />;
  });

  return (
    <div className="DrawCard">
      <div>{cards}</div>
      {card ? (
        <button className="DrawCard-button" onClick={toggleAutoDraw}>
          {autoDraw ? "STOP" : "KEEP"} DRAWING FOR ME!
        </button>
      ) : null}
      {cardLeft === 0 ? (
        <div className="DrawCard-card-out">Out Of Card</div>
      ) : null}
    </div>
  );
};

export default DrawCard;

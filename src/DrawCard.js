import React, {useEffect, useRef, useState} from "react";
import Card from "./Card";
import axios from "axios";

const DrawCard = () => {
    const [card, getCard] = useState([]);
    const deck = useRef();

    useEffect(() => {
        const getDeckOfCard = async () => {
            const cardResult = await axios.get(
                "http://deckofcardsapi.com/api/deck/new/draw/");
            deck.current = cardResult.data.deck_id;
            console.log(deck.current)
            console.log(deck)
        }
        getDeckOfCard();
    }, [])

    console.log(deck.current)
    // useEffect(()=>{
    //     const drawCard = async () => {
    //         const cardResult = await axios.get(
    //             `http://deckofcardsapi.com/api/deck/${deck.current}/draw/`);
    //         const {cards} = cardResult;
    //         getCard([...card, cards.image])
    //     }
    //     drawCard();
    // }, [deck.current])

    return (
        <div>
            {card.map(card => {
                return <Card imageUrl={card}/>
            })}
            <button></button>
        </div>
    )
}


export default DrawCard;
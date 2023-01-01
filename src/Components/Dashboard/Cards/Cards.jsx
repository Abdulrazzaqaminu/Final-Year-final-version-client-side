import React from "react";
import './Cards.css';
import SingleCard from "./EachCard";

const Cards = () =>{
    return(
        <>
            <div className="insights">   
                {SingleCard.map((card, index) => (
                    <>
                    <div className="cards" key={index}>
                        <span>{card.cardIcon}</span>
                        <div className="middle">
                            <div className="left">
                                <h2>{card.cardTile}</h2>
                                <small className="text-muted">{card.cardInfo}</small>                    
                            </div>
                        </div>
                    </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Cards;
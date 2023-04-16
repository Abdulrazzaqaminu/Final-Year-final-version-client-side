import React from "react";
import './Cards.css';
import * as BsIcons from 'react-icons/bs';
import * as CgIcons from 'react-icons/cg';
import useFetch from "../../../hooks/Fetch/useFetch";

const Cards = () =>{
    const {data, loading, error, reFetch} = useFetch(`http://127.0.0.1:4040/api/dashboard`);

    const SingleCard = [
        {
            cardTile: "Employees",
            cardIcon: <BsIcons.BsFillPeopleFill />,
            cardInfo: data?.Number_of_Employees
        },
        {
            cardTile: "Entry",
            cardIcon: <CgIcons.CgLogIn />,
            cardInfo: data?.Number_of_entries
        },
        {
            cardTile: "Exit",
            cardIcon: <CgIcons.CgLogOut />,
            cardInfo: data?.Number_of_exits
        },
    ]

    return(
        <>
            <div className="insights">   
                {SingleCard.map((card, index) => (
                    <div className="cards" key={card.cardTile}>
                        <span key={card.cardTile}>{card.cardIcon}</span>
                        <div className="middle" key={index}>
                            <div className="left" key={index}>
                                <h2 key={card.cardTile}>{card.cardTile}</h2>
                                <small className="text-muted" key={card.cardInfo}>{card.cardInfo}</small>                    
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Cards;
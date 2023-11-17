import React from "react";
import CardsPage from "./CardsPage";
import "./CardsCritique.css"
import "./CardsPasCritique.css"

const CardPageOffres = ({sessions, offres}) => {
    const filteredList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((dto) => dto.status === "In_review");

    return (
        <CardsPage filteredList={filteredList} titre="offres en attente" url="/Offres-veto"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageOffres

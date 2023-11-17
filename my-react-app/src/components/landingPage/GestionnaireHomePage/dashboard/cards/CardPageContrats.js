import React from "react";
import CardsPage from "./CardsPage";
import "./CardsCritique.css"
import "./CardsPasCritique.css"

const CardPageContrats = ({contrats}) => {
    const filteredList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((dto) => dto.statutGestionnaire === "Pas_Signer");

    return (
        <CardsPage filteredList={filteredList} titre="signatures de contrats en attente" url="/contrats"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageContrats

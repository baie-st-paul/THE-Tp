import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";
import "../../../Dashboard/CardsCritique.css"
import "../../../Dashboard/CardsPasCritique.css"

const CardPageContrats = ({contrats}) => {
    const filteredList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((dto) => dto.statutGestionnaire === "Pas_Signer");

    return (
        <CardsPage nbFilteredList={filteredList.length} titre="signatures de contrats en attente" url="/contrats"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageContrats

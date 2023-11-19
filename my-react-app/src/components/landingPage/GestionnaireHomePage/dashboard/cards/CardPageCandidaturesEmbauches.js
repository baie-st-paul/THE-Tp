import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";
import "../../../Dashboard/CardsCritique.css"
import "../../../Dashboard/CardsPasCritique.css"

const CardPageCandidaturesEmbauches = ({candidaturesEmbauches}) => {
    const filteredEmbauchesList = candidaturesEmbauches.length !== 0 && candidaturesEmbauches.length !== undefined &&
        candidaturesEmbauches.filter((embauche) => embauche.statusVuPasVuG === "pasVu");

    return (
        <CardsPage nbFilteredList={filteredEmbauchesList.length} titre="création de contrats en attente" url="/embauchés"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageCandidaturesEmbauches

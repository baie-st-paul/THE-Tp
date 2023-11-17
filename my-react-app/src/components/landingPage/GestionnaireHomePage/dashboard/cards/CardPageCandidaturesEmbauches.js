import React from "react";
import CardsPage from "./CardsPage";
import "./CardsCritique.css"
import "./CardsPasCritique.css"

const CardPageCandidaturesEmbauches = ({candidaturesEmbauches}) => {
    const filteredEmbauchesList = candidaturesEmbauches.length !== 0 && candidaturesEmbauches.length !== undefined &&
        candidaturesEmbauches.filter((embauche) => embauche.statusVuPasVuG === "pasVu");

    return (
        <CardsPage filteredList={filteredEmbauchesList} titre="création de contrats en attente" url="/embauchés"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageCandidaturesEmbauches

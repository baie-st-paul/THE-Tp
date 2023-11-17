import React from "react";
import CardsPage from "./CardsPage";
import "./CardsCritique.css"
import "./CardsPasCritique.css"

const CardPageCandidaturesEntrevue = ({candidaturesEntrevue}) => {
    const filteredEntrevues = candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined &&
        candidaturesEntrevue.filter((entrevue) => entrevue.status === "EnAttente");

    return (
        <CardsPage filteredList={filteredEntrevues} titre="entrevues pas encore accepté par l'étudiant" url="/entrevues"
                   id="cardsPasCritique" colorAvatar="#000066"/>
    )
}

export default CardPageCandidaturesEntrevue

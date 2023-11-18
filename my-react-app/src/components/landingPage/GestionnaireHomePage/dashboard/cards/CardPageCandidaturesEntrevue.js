import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";
import "../../../Dashboard/CardsCritique.css"
import "../../../Dashboard/CardsPasCritique.css"

const CardPageCandidaturesEntrevue = ({candidaturesEntrevue}) => {
    const filteredEntrevues = candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined &&
        candidaturesEntrevue.filter((entrevue) => entrevue.status === "EnAttente");
    const filteredPasVuEntrevues = candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined &&
        candidaturesEntrevue.filter((entrevue) => entrevue.statusVuPasVuG === "pasVu");

    return (
        <div>
            <CardsPage filteredList={filteredEntrevues} titre="entrevues pas encore accepté par l'étudiant" url="/entrevues"
                       id="cardsPasCritique" colorAvatar="#000066"/>
            <CardsPage filteredList={filteredPasVuEntrevues} titre="nouvelles entrevues" url="/entrevues"
                       id="cardsPasCritique" colorAvatar="#000066"/>
        </div>
    )
}

export default CardPageCandidaturesEntrevue

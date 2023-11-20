import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";
import "../../../Dashboard/CardsCritique.css"
import "../../../Dashboard/CardsPasCritique.css"

const CardPageCandidaturesEmbauches = ({contrats, candidaturesEmbauches}) => {
    const candidatureContrat = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.map((contrat) => contrat.candidatureId);

    const candidatureEmbauche = candidaturesEmbauches.length !== 0 && candidaturesEmbauches.length !== undefined &&
        candidaturesEmbauches.map((candidature) => candidature.id)

    const filterEmbauchePasContrat = candidatureContrat.length !== 0 && candidatureContrat.length !== undefined &&
        candidatureEmbauche.length !== 0 && candidatureEmbauche.length !== undefined &&
        candidatureEmbauche.filter(
            (candidature) => !candidatureContrat.includes(candidature)
        )

    return (
        filterEmbauchePasContrat.length > 0 &&
        <CardsPage nbFilteredList={filterEmbauchePasContrat.length} titre="création de contrats en attente" url="/embauchés"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageCandidaturesEmbauches

import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";

const CardPageOffresS = ({offres, candidaturesOffreId, candidatures}) => {
    const filteredOffreList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offreDto) => !(candidaturesOffreId.length > 0 && candidaturesOffreId.includes(offreDto.id)) &&
            offreDto.statusVuPasVuS === "pasVu");

    const filterCandidaturesAccepted = candidatures.length !== 0 && candidatures.length !== undefined &&
        candidatures.filter((candidature) => candidature.status === "Accepted")

    return (
        <div>
            {filteredOffreList.length > 0 &&
                <CardsPage nbFilteredList={filteredOffreList.length} titre="offres nouvelles offres pas postulé" url="/offresEtudiant"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }
            {filterCandidaturesAccepted.length > 0 &&
                <CardsPage nbFilteredList={filterCandidaturesAccepted.length} titre="candidatures acceptées par l'employeur" url="/candidaturesEtudiant"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }
        </div>
    )
}

export default CardPageOffresS

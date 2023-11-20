import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";

const CardPageOffresS = ({offres, candidaturesOffreId}) => {
    const filteredOffreList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offreDto) => !(candidaturesOffreId.length > 0 && candidaturesOffreId.includes(offreDto.id)) &&
            offreDto.statusVuPasVuS === "pasVu");

    return (
        <div>
            <CardsPage nbFilteredList={filteredOffreList.length} titre="offres nouvelles offres pas postulé" url="/offresEtudiant"
                       id="cardsPasCritique" colorAvatar="#000066"/>

        </div>
    )
}

export default CardPageOffresS

import CardsPage from "../../../Dashboard/CardsPage";
import React from "react";
import PageNoNotifications from "../../../Dashboard/PageNoNotifications";

const AllCardsNotifications = ({entrevues, contrats, offres, candidaturesOffreId, candidatures}) => {
    const filteredEntrevuesEnAttente = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.filter((entrevue) => entrevue.status === "EnAttente");

    const filteredContratsList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => contrat.statutEtudiant === "Pas_Signer");

    const filteredOffreList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offreDto) => !(candidaturesOffreId.length > 0 && candidaturesOffreId.includes(offreDto.id)) &&
            offreDto.statusVuPasVuS === "pasVu");

    const filterCandidaturesAccepted = candidatures.length !== 0 && candidatures.length !== undefined &&
        candidatures.filter((candidature) => candidature.status === "Accepted")

    return (
        <div>
            {
                filteredEntrevuesEnAttente.length === 0 &&
                filteredContratsList.length === 0 ?
                    <PageNoNotifications/> :
                    <div>
                        {filteredEntrevuesEnAttente.length > 0 &&
                            <CardsPage nbFilteredList={filteredEntrevuesEnAttente.length} titre="entrevues en attente"
                                       url="/entrevuesEtudiant"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filteredContratsList.length > 0 &&
                            <CardsPage nbFilteredList={filteredContratsList.length}
                                       titre="signatures de contrats en attente"
                                       url="/contratsEtudiant"
                                       id="cards" colorAvatar="saddlebrown"/>}
                    </div>
            }
            {filteredOffreList.length > 0 &&
                <CardsPage nbFilteredList={filteredOffreList.length} titre="nouvelles offres pas postulé" url="/offresEtudiant"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }
            {filterCandidaturesAccepted.length > 0 &&
                <CardsPage nbFilteredList={filterCandidaturesAccepted.length} titre="candidatures acceptées par l'employeur" url="/candidaturesEtudiant"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }
        </div>
    )
}

export default AllCardsNotifications

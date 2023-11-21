import CardsPage from "../../../Dashboard/CardsPage";
import React from "react";
import PageNoNotifications from "../../../Dashboard/PageNoNotifications";
import Divider from "@mui/material/Divider";
import CardsPasCritique from "../../../Dashboard/CardsPasCritique";

const AllCardsNotificationsEmp = ({sessions, offres, cvList, contrats, candidaturesEmbauches, candidaturesEntrevue}) => {
    const filteredListOffre = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((dto) => dto.status === "In_review");

    const filteredListCv = cvList.length !== 0 && cvList.length !== undefined &&
        cvList.filter((dto) => dto.status === "In_review");

    const candidatureContrat = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.map((contrat) => contrat.candidatureId);
    const candidatureEmbauche = candidaturesEmbauches.length !== 0 && candidaturesEmbauches.length !== undefined &&
        candidaturesEmbauches.map((candidature) => candidature.id)
    const filterEmbauchePasContrat = candidatureContrat.length !== 0 && candidatureContrat.length !== undefined &&
        candidatureEmbauche.length !== 0 && candidatureEmbauche.length !== undefined &&
        candidatureEmbauche.filter(
            (candidature) => !candidatureContrat.includes(candidature)
        )

    const filteredListContratsPasSigne = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((dto) => dto.statutGestionnaire === "Pas_Signer"
            && dto.statutEmployeur === "Signer" && dto.statutEtudiant === "Signer");

    const filteredEntrevues = candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined &&
        candidaturesEntrevue.filter((entrevue) => entrevue.status === "EnAttente");
    const filteredPasVuEntrevues = candidaturesEntrevue.length !== 0 && candidaturesEntrevue.length !== undefined &&
        candidaturesEntrevue.filter((entrevue) => entrevue.statusVuPasVuG === "pasVu");

    return (
        <div>
            {
                filteredListOffre.length === 0 &&
                filteredListCv.length === 0 &&
                filterEmbauchePasContrat.length === 0 &&
                filteredListContratsPasSigne.length === 0 ?
                    <PageNoNotifications/> :
                    <div>
                        {filteredListOffre.length > 0 &&
                            <CardsPage nbFilteredList={filteredListOffre.length} titre="offres en attente" url="/Offres-veto"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filteredListCv.length > 0 &&
                            <CardsPage nbFilteredList={filteredListCv.length} titre="cvs en attente" url="/CV-veto"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filterEmbauchePasContrat.length > 0 &&
                            <CardsPage nbFilteredList={filterEmbauchePasContrat.length} titre="création de contrats en attente" url="/embauchés"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filteredListContratsPasSigne.length > 0 &&
                            <CardsPage nbFilteredList={filteredListContratsPasSigne.length} titre="signatures de contrats en attente" url="/contrats"
                                       id="cards" colorAvatar="saddlebrown"/>}
                    </div>
            }
            <Divider color="black"/>

            <CardsPasCritique filteredList={filteredPasVuEntrevues} card={
                <CardsPage nbFilteredList={filteredPasVuEntrevues.length} titre="nouvelles entrevues" url="/entrevues"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }/>
            <CardsPasCritique filteredList={filteredEntrevues} card={
                <CardsPage nbFilteredList={filteredEntrevues.length} titre="entrevues pas encore accepté par l'étudiant"
                           url="/entrevues"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }/>
        </div>
    )
}

export default AllCardsNotificationsEmp

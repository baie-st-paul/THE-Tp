import CardsPage from "../../../Dashboard/CardsPage";
import React from "react";
import PageNoNotifications from "../../../Dashboard/PageNoNotifications";
import Divider from "@mui/material/Divider";
import CardsPasCritique from "../../../Dashboard/CardsPasCritique";

const AllCardsNotificationsEmp = ({contrats, offres, candidatures, entrevues}) => {
    const filteredContratsList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => contrat.statutEmployeur === "Pas_Signer");

    const filterEnAttente = candidatures.length !== 0 && candidatures.length !== undefined &&
        candidatures.filter((candidature) => candidature.status === "In_review");

    const candidatureFilter = candidatures.length !== 0 && candidatures.length !== undefined &&
        candidatures.map((candidature) => candidature.student.matricule + " " + candidature.offreStage.titre)
    const entrevueFilter = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.map((entrevue) => entrevue.student.matricule + " " + entrevue.offreStage.titre)
    const filterPasEntrevue = entrevueFilter.length !== 0 && entrevueFilter.length !== undefined &&
        candidatureFilter.length !== 0 && candidatureFilter.length !== undefined &&
        candidatureFilter.filter(
            (candidature) => !entrevueFilter.includes(candidature)
        )
    console.log("filterPasEntrevue",filterPasEntrevue)

    const offresNotAccepted = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offre) => offre.status !== "Accepted")

    const filterEntrevuesRefused = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.filter((entrevue) => entrevue.status === "Refusee");

    return (
        <div>
            {
                filteredContratsList.length === 0 &&
                filterEnAttente.length === 0 &&
                filterPasEntrevue.length === 0 ?
                    <PageNoNotifications/> :
                    <div>
                        {filteredContratsList.length > 0 &&
                            <CardsPage nbFilteredList={filteredContratsList.length} titre="signatures de contrats en attente" url="/contrats-emp"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filterEnAttente.length > 0 &&
                            <CardsPage nbFilteredList={filterEnAttente.length} titre="candidats en attente d'embauche" url="/offres"
                                       id="cards" colorAvatar="saddlebrown"/>
                        }
                        {filterPasEntrevue.length > 0 &&
                            <CardsPage nbFilteredList={filterPasEntrevue.length} titre="candidats pas encore convoqués" url="/offres"
                                       id="cards" colorAvatar="saddlebrown"/>
                        }
                    </div>
            }
            <Divider color="black"/>

            <CardsPasCritique filteredList={filterEntrevuesRefused} card={
                <CardsPage nbFilteredList={filterEntrevuesRefused.length} titre="entrevues refusées par l'étudiant"
                           url="/offres"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }/>
            <CardsPasCritique filteredList={offresNotAccepted} card={
                <CardsPage nbFilteredList={offresNotAccepted.length}
                           titre="offres pas encore acceptées par le gestionnaire" url="/offres"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }/>
        </div>
    )
}

export default AllCardsNotificationsEmp

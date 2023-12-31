import CardsPage from "../../../Dashboard/CardsPage";
import React from "react";
import PageNoNotifications from "../../../Dashboard/PageNoNotifications";
import Divider from "@mui/material/Divider";
import CardsPasCritique from "../../../Dashboard/CardsPasCritique";

const AllCardsNotificationsEmp = ({contrats, offres, candidatures, entrevues}) => {
    const filteredContratsList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => contrat.statutEmployeur === "Pas_Signer");

    const filteredNotifyRapportHeure = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => contrat.statutEtudiant === 'Signer' && contrat.statutGestionnaire === 'Signer' &&
            contrat.statutEmployeur === 'Signer' && contrat.rapportFile === null);

    const filteredNotifyEvaluationStudent = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => contrat.statutEtudiant === 'Signer' && contrat.statutGestionnaire === 'Signer' &&
            contrat.statutEmployeur === 'Signer' && contrat.evaluationPDF === null);

    const filterEnAttente = candidatures.length !== 0 && candidatures.length !== undefined &&
        candidatures.filter((candidature) => candidature.status === "Interview" ||
            candidature.status === "In_review");

    const candidaturesEnAttente = candidatures.length !== 0 && candidatures.length !== undefined &&
        candidatures.filter((candidature) => candidature.status === "In_review")
    const candidatureFilter = candidaturesEnAttente.length !== 0 && candidaturesEnAttente.length !== undefined &&
        candidaturesEnAttente.map((candidature) => candidature.student.matricule  + " " +  candidature.offreStage.titre)
    const entrevueFilter = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.map((entrevue) => entrevue.student.matricule + " " + entrevue.offreStage.titre)
    const filterPasEntrevue = entrevueFilter.length !== 0 && entrevueFilter.length !== undefined &&
        candidatureFilter.length !== 0 && candidatureFilter.length !== undefined &&
        candidatureFilter.filter(
            (candidature) => !entrevueFilter.includes(candidature)
        )
    console.log("filterPasEntrevue",filterPasEntrevue)

    const offresAccepted = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offre) => offre.status === "Accepted")
    localStorage.setItem('filtreOffre', "Accepted");

    const filterEntrevuesRefused = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.filter((entrevue) => entrevue.status === "Refusee");

    return (
        <div>
            {
                (filteredContratsList.length === 0 || filteredContratsList.length === undefined) &&
                (filteredNotifyRapportHeure.length === 0 || filteredNotifyRapportHeure.length === undefined) &&
                (filteredNotifyEvaluationStudent.length === 0 || filteredNotifyEvaluationStudent.length === undefined) &&
                (filterEnAttente.length === 0 || filterEnAttente.length === undefined) &&
                (filterPasEntrevue.length === 0 || filterPasEntrevue.length === undefined) ?
                    <PageNoNotifications/> :
                    <div>
                        {filteredContratsList.length > 0 &&
                            <CardsPage nbFilteredList={filteredContratsList.length} titre="signatures de contrats en attente" url="/contrats-emp"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filteredNotifyRapportHeure.length > 0 &&
                            <CardsPage nbFilteredList={filteredNotifyRapportHeure.length} titre="formulaire de rapport des heures à remplir" url="/contrats-emp"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filteredNotifyEvaluationStudent.length > 0 &&
                            <CardsPage nbFilteredList={filteredNotifyEvaluationStudent.length} titre="formulaire de l'évaluation d'un stagiaire à remplir" url="/contrats-emp"
                                       id="cards" colorAvatar="saddlebrown"/>}

                        {filterEnAttente.length > 0 &&
                            <CardsPage nbFilteredList={filterEnAttente.length} titre="candidats en attente d'embauche" url="/candidatures"
                                       id="cards" colorAvatar="saddlebrown" filter="need-action"/>
                        }
                        {filterPasEntrevue.length > 0 &&
                            <CardsPage nbFilteredList={filterPasEntrevue.length} titre="candidats pas encore convoqués" url="/candidatures"
                                       id="cards" colorAvatar="saddlebrown" filter="In_review"/>
                        }
                    </div>
            }
            <Divider color="black"/>

            <CardsPasCritique filteredList={offresAccepted} card={
                <CardsPage nbFilteredList={offresAccepted.length}
                           titre="offres acceptées par le gestionnaire" url="/offres"
                           id="cardsPasCritique" colorAvatar="#000066"/>
            }/>
            <CardsPasCritique filteredList={filterEntrevuesRefused} card={
                <CardsPage nbFilteredList={filterEntrevuesRefused.length} titre="entrevues refusées par l'étudiant"
                           url="/candidatures"
                           id="cardsPasCritique" colorAvatar="#000066" filter="refused" />
            }/>
        </div>
    )
}

export default AllCardsNotificationsEmp

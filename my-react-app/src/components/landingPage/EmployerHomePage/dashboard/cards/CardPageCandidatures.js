import CardsPage from "../../../Dashboard/CardsPage";

const CardPageCandidatures = ({offres, candidatures, entrevues}) => {
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
    console.log(filterPasEntrevue)

    const offresNotAccepted = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((offre) => offre.status !== "Accepted")

    const filterEntrevuesRefused = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.filter((entrevue) => entrevue.status === "Refusee");

    return (
        <div>
            {filterEnAttente.length > 0 &&
                <CardsPage nbFilteredList={filterEnAttente.length} titre="candidats en attente d'embauche" url="/offres"
                        id="cards" colorAvatar="saddlebrown"/>
            }
            {filterPasEntrevue.length > 0 &&
                <CardsPage nbFilteredList={filterPasEntrevue.length} titre="candidats pas encore convoqués" url="/offres"
                        id="cards" colorAvatar="saddlebrown"/>
            }
            {filterEntrevuesRefused.length > 0 &&
                <CardsPage nbFilteredList={filterEntrevuesRefused.length} titre="entrevues refusées par l'étudiant"
                        url="/offres"
                        id="cardsPasCritique" colorAvatar="#000066"/>
            }
            {offresNotAccepted.length > 0 &&
                <CardsPage nbFilteredList={offresNotAccepted.length}
                        titre="offres pas encore acceptées par le gestionnaire" url="/offres"
                        id="cardsPasCritique" colorAvatar="#000066"/>
            }
        </div>
    )
}

export default CardPageCandidatures

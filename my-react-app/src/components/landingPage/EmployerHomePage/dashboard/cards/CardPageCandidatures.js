import CardsPage from "../../../Dashboard/CardsPage";

const CardPageCandidatures = ({candidatures, entrevues}) => {
    const filterEnAttente = candidatures.length !== 0 && candidatures.length !== undefined &&
        candidatures.filter((candidature) => candidature.status === "In_review");
    const nbCandidaturesPasEntrevue = candidatures.length - entrevues.length;
    const filterEntrevuesRefused = entrevues.length !== 0 && entrevues.length !== undefined &&
        entrevues.filter((entrevue) => entrevue.status === "Refusee");

    return (
        <div>
            <CardsPage nbFilteredList={filterEnAttente.length} titre="candidats en attente d'embauche" url="/offres"
                       id="cards" colorAvatar="saddlebrown"/>
            <CardsPage nbFilteredList={nbCandidaturesPasEntrevue} titre="candidats pas encore convoqués" url="/offres"
                       id="cards" colorAvatar="saddlebrown"/>
            <CardsPage nbFilteredList={filterEntrevuesRefused.length} titre="entrevues refusées par l'étudiant" url="/offres"
                       id="cardsPasCritique" colorAvatar="#000066"/>
        </div>
    )
}

export default CardPageCandidatures

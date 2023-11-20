import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";

const CardPageContratsEmp = ({contrats}) => {
    const filteredContratsList = contrats.length !== 0 && contrats.length !== undefined &&
        contrats.filter((contrat) => contrat.statutEmployeur === "Pas_Signer");

    return (
        filteredContratsList.length > 0 &&
        <CardsPage nbFilteredList={filteredContratsList.length} titre="signatures de contrats en attente" url="/contrats-emp"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageContratsEmp

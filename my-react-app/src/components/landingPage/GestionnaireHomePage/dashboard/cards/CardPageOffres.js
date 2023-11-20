import React from "react";
import CardsPage from "../../../Dashboard/CardsPage";
import "../../../Dashboard/CardsCritique.css"
import "../../../Dashboard/CardsPasCritique.css"

const CardPageOffres = ({sessions, offres}) => {
    const filteredList = offres.length !== 0 && offres.length !== undefined &&
        offres.filter((dto) => dto.status === "In_review");

    return (
        filteredList.length > 0 &&
        <CardsPage nbFilteredList={filteredList.length} titre="offres en attente" url="/Offres-veto"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageOffres

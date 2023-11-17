import React from "react";
import CardsPage from "./CardsPage";
import "./CardsCritique.css"
import "./CardsPasCritique.css"

const CardPageCvs = ({cvList}) => {
    const filteredList = cvList.length !== 0 && cvList.length !== undefined &&
        cvList.filter((dto) => dto.status === "In_review");

    return (
        <CardsPage filteredList={filteredList} titre="cvs en attente" url="/CV-veto"
                   id="cards" colorAvatar="saddlebrown"/>
    )
}

export default CardPageCvs

import "../../../../EmployerHomePage/dashboard/cards/signature/CardPageSignature.css"
import React from "react";

const CardPageCvSignature = ({signature, cv}) => {
    return (
        <div className="container text-center mt-5" style={{justifyContent: "center", display: "flex"}}>
            <div style={{width: "500px"}}>
                <img
                    src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                    alt="Ajouter une signature"
                    className="img-fluid"
                />
                {cv === null && signature === null ?
                    <div>Ajouter un cv et une signature !</div> :
                    signature === null && cv !== null && cv.status === "Accepted" ?
                        <div>Ajouter une signature, le cv a été accepté</div> :
                        signature !== null && cv === null ?
                            <div>La signature a bien été ajoutée, ajouter un cv !</div>
                            : signature !== null && cv !== null && cv.status === "In_review" ?
                                <div>Le cv n'a pas encore été accepté,
                                    la signature a bien été ajoutée</div> :
                                signature !== null && cv !== null && cv.status === "Refused" ?
                                    <div>Le cv a été refusé, ajouter un nouveau cv,
                                        la signature a bien été ajoutée</div> :
                                    signature === null && cv !== null && cv.status === "In_review" ?
                                        <div>Le cv n'a pas encore été accepté,
                                            ajouter une signature !</div> :
                                        signature === null && cv.length !== null && cv.status === "Refused" &&
                                        <div>Le cv a été refusé, ajouter un nouveau cv,
                                            ajouter une signature !</div>
                }
                <p className="lead">Le tableau de bord sera affiché par la suite</p>
            </div>
        </div>
    )
}

export default CardPageCvSignature

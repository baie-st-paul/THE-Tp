import al from "../../../../images/al.png"
import {Link} from "react-router-dom";
import React from "react";
import backgroundConnexionInscription from "../../../../images/backgroundConnexionInscription.png";
import InscriptionPageEmp from "./InscriptionPageEmp";

const InscriptionEmployeur = () => {
    return (
        <div className="appConnexion">
            <Link to="/" className="imageLogo">
                <img style={{width: 230}} src={al} alt="logo"/>
            </Link>

            <div className="formConnexion">
                <InscriptionPageEmp/>
            </div>
        </div>
    )
}

export default InscriptionEmployeur

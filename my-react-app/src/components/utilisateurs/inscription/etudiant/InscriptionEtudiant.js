import al from "../../../../images/al.png"
import {Link} from "react-router-dom";
import React from "react";
import backgroundConnexionInscription from "../../../../images/backgroundConnexionInscription.png";
import InscriptionPageE from "./InscriptionPageE";

const InscriptionEtudiant = () => {
    return (
        <div>
            <Link to="/" className="imageLogo">
                <img style={{width: 230}} src={al} alt="logo"/>
            </Link>

            <div>
                <img className="imageBackground" src={backgroundConnexionInscription}  alt="photo école"/>
            </div>

            <div className="formInscriptionE">
                <InscriptionPageE/>
            </div>
        </div>
    )
}

export default InscriptionEtudiant

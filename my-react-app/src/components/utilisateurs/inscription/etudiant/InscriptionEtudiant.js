import al from "../../../../images/al.png"
import {Link} from "react-router-dom";
import React from "react";
import InscriptionPageE from "./InscriptionPageE";

const InscriptionEtudiant = () => {
    return (
        <div className="appConnexion">
            <Link to="/" className="imageLogo">
                <img style={{width: 230}} src={al} alt="logo"/>
            </Link>

            <div className="formConnexion">
                <InscriptionPageE/>
            </div>
        </div>
    )
}

export default InscriptionEtudiant

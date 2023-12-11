import al from '../../../../images/al.png'
import backgroundConnexionInscription from '../../../../images/backgroundConnexionInscription.png'
import React from 'react'
import "./Connexion.css"
import ConnexionPage from "./ConnexionPage";
import {Link} from "react-router-dom";

const Connexion = () => {
    return (
        <div>
            <Link to="/" className="imageLogo">
                <img style={{width: 230}} src={al} alt="logo"/>
            </Link>
            <div>
                <img className="imageBackground" src={backgroundConnexionInscription}  alt="photo école"/>
            </div>

            <div className="formConnexion">
                <ConnexionPage/>
            </div>
        </div>
    )
}

export default Connexion

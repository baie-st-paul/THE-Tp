import al from '../../../../images/al.png'
import React from 'react'
import "./Connexion.css"
import ConnexionPage from "./ConnexionPage";
import {Link} from "react-router-dom";

const Connexion = () => {
    return (
        <div className="appConnexion">
            <Link to="/" className="imageLogo">
                <img style={{width: 230}} src={al} alt="logo"/>
            </Link>

            <div className="formConnexion">
                <ConnexionPage/>
            </div>
        </div>
    )
}

export default Connexion

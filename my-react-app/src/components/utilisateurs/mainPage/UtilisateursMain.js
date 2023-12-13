import React from 'react'
import "./style.css"
import al from '../../../images/al.png'
import {Link} from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const UtilisateursMain = () => {
    return (
        <div className="app">

            <div className="imageLogo">
                <img style={{width: 180}} src={al} alt="logo"/>
            </div>

            <div className="boxContainer">
                <div className="title">Service à la vie étudiante :
                    <br/>Offre-Stage-Emplois</div>

                <div className="button-container">
                    <Link to='/utilisateurConnexion' className='btn button'>
                        <div className='btn btn-block'>
                            <div className="textButton">Connexion</div>
                        </div>
                    </Link>

                    <div className="btn button">
                        <Dropdown>
                            <Dropdown.Toggle variant="" style={{color: "white"}}>
                                    <span className="textButton">Inscription</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{backgroundColor : '#C07B4C'}}>
                                <Dropdown.Item href="/etudiantInscription" style={{color: "white"}}>Étudiant</Dropdown.Item>
                                <Dropdown.Item href="/employeurInscription" style={{color: "white"}}>Employeur</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UtilisateursMain

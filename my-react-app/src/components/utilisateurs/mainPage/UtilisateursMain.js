import React from 'react'
import al from '../../../images/al.png'
import backgroundUserMain from '../../../images/backgroundUserMain.png'
import {Link} from "react-router-dom";
import DropdownUsersInscription from "../dropdownUsers/DropdownUsersInscription";

export default function UtilisateursMain() {

    return (
        <>
            <div>
                <img src={backgroundUserMain} alt="background"/>
                <div className="imageLogo">
                    <img style={{width: 230}} src={al} alt="logo"/>
                </div>

                <div style={{width: 790, height: 338, left: 373, top: 201, position: 'absolute',
                    background: 'rgba(0, 0, 0, 0.20)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                    borderRadius: 34}} />

                <div style={{left: 471, top: 264, position: 'absolute', color: 'white', fontSize: 50, fontFamily: 'Roboto',
                    fontWeight: '800', wordWrap: 'break-word'}}>
                    Service à la vie étudiante :<br/>Offre-Stage-Emplois</div>

                <div style={{left: 540, top: 413, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start',
                    alignItems: 'flex-start', gap: 20, display: 'inline-flex'}}>
                    <div>
                        <Link to='/utilisateurConnexion' className='btn btn-block'
                              style={{width: 220, height: 46, position: 'relative', background: '#C07B4C',
                                  borderRadius: 8, overflow: 'hidden'}}>

                            <div style={{color: 'white', fontSize: 16,
                                fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>
                                Connexion</div>
                        </Link>

                        <div className='btn btn-block'
                              style={{width: 220, height: 46, position: 'relative', background: '#C07B4C',
                                  borderRadius: 8}}>

                            <div style={{color: 'white', fontSize: 16,
                                fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>
                                <DropdownUsersInscription titre="S'inscrire"></DropdownUsersInscription>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

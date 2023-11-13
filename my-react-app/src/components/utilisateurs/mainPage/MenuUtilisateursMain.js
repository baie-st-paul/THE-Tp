import React from 'react'
import DropdownUsersInscription from "../dropdownUsers/DropdownUsersInscription";
import '../../StylesGenerales.css'
import {Link} from "react-router-dom";


export default function MenuUtilisateursMain() {
  return (
    <>
        <div className=''>
            <div className='menuButtons font d-flex justify-content-center'>
                <DropdownUsersInscription titre="S'inscrire"></DropdownUsersInscription>
                <button className='button'>
                    <Link to='/utilisateurConnexion' style={{ textDecoration: 'none' }} className='connexion'>Se connecter</Link>
                </button>
            </div>
        </div>
    </>
  )
}

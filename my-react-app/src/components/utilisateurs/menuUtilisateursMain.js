/* changement pour pouvoir avoir le choix des users
<button className='px-5 button mx-2'>S'inscrire</button>
<button className='px-5 button mx-2'>Se Connecter</button>
*/

import React from 'react'
import DropdownUsersInscription from "./DropdownUsersInscription";
import '../stylesGenerales.css'
import {Link} from "react-router-dom";


export default function MenuUtilisateursMain() {
  return (
    <>
        <div className=''>
            <div className='menuButtons font d-flex justify-content-center'>
                <DropdownUsersInscription titre="S'inscrire"></DropdownUsersInscription>
                <button className='button'>
                    <Link to='/utilisateurConnexion'>Se connecter</Link>
                </button>
            </div>
        </div>
    </>
  )
}

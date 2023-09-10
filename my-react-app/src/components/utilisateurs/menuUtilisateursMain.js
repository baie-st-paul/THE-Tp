/* changement pour pouvoir avoir le choix des users
<button className='px-5 button mx-2'>S'inscrire</button>
<button className='px-5 button mx-2'>Se Connecter</button>
*/

import React from 'react'
import DropdownUsersInscription from "./DropdownUsersInscription";
import '../stylesGenerales.css'
import DropdownUsersConnexion from "./DropdownUsersConnexion";


export default function MenuUtilisateursMain() {
  return (
    <>
        <div className='menuButtons'>
            <div className='font d-flex justify-content-center'>
                <button className='button ml-2'>
                    <DropdownUsersInscription titre="S'inscrire"></DropdownUsersInscription>
                </button>
                <button className=' button'>
                    <DropdownUsersConnexion titre="Se Connecter"></DropdownUsersConnexion>
                </button>
            </div>
        </div>
    </>
  )
}

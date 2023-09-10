import React from 'react'
import DropdownUsersInscription from "../dropdownUsers/DropdownUsersInscription";
import '../../stylesGenerales.css'
import DropdownUsersConnexion from "../dropdownUsers/DropdownUsersConnexion";


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

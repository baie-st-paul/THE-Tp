/* changement pour pouvoir avoir le choix des users
<button className='px-5 button mx-2'>S'inscrire</button>
<button className='px-5 button mx-2'>Se Connecter</button>
*/

import React from 'react'
import DropdownUsers from "./DropdownUsers";
import '../stylesGenerales.css'


export default function MenuUtilisateursMain() {
  return (
    <>
        <div className='menuButtons'>
            <div className='font d-flex justify-content-center'>
                <button className='button ml-2'>
                    <DropdownUsers  titre="S'inscrire"></DropdownUsers>
                </button>
                <button className=' button'>
                    <DropdownUsers titre="Se Connecter"></DropdownUsers>
                </button>
            </div>
        </div>
    </>
  )
}

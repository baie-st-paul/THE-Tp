/* changement pour pouvoir avoir le choix des users
<button className='px-5 button mx-2'>S'inscrire</button>
<button className='px-5 button mx-2'>Se Connecter</button>
*/

import React from 'react'
import DropdownUsers from "./DropdownUsers";

export default function MenuUtilisateursMain() {
  return (
    <>
        <div className='d-flex justify-content-center'></div>
        <div className=' menuButtons d-flex justify-content-center '>
            <div className=''>
                <button className='px-5 button mx-2'>
                    <DropdownUsers titre="S'inscrire"></DropdownUsers>
                </button>
                <button className='px-5 button mx-2'>
                    <DropdownUsers titre="Se connecter"></DropdownUsers>
                </button>
            </div>
        </div>
    </>
  )
}

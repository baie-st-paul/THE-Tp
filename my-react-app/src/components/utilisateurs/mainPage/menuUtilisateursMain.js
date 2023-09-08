import React from 'react'
import DropdownUsers from "../dropdownUsers/DropdownUsers";
import '../../stylesGenerales.css'


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

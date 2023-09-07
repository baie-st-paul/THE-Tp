import React from 'react'
import al from  '../../images/al.png' 
import './utilisateursMain.css'
import MenuUtilisateursMain from './menuUtilisateursMain'

export default function UtilisateursMain() {

  return (
   <>
       <div className='bg-light vh-100'>
           <div className='centrerPage pt-5'>
               <img  className='border logoAndre' src={al} alt="logoAndreLaurendeau"></img>
           </div>
           <MenuUtilisateursMain></MenuUtilisateursMain>
       </div>
   </>
  )
}

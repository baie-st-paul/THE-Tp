import React from 'react'
import al from  '../../images/al.png' 
import './utilisateursMain.css'
import MenuUtilisateursMain from './menuUtilisateursMain'

export default function UtilisateursMain() {

  return (
   <>
       <div className='bg-light vh-100'>
           <div className='centrerPage pt-5'>
               <img  className=' logoAndre' src={al} alt="logoAndreLaurendeau"></img>
           </div>
           <h1 className='texteStage mt-1 text-center font'>Recherche des stages</h1>
           <MenuUtilisateursMain></MenuUtilisateursMain>
       </div>
   </>
  )
}

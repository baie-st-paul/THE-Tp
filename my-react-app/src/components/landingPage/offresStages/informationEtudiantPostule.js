import React from 'react'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './informationEtudiantPostule.css'
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
export default function InformationEtudiantPostule({listeEtudiants}) {
  const navigate = useNavigate();
  const location = useLocation();
  {/*   Pour le api
  listeEtudiants = location.state.listeEtudiants
*/}

  listeEtudiants = [{
    nom: 'mosk0',
    prenom: 'danil0aaaaaaaaaaaaaaaaa21312312321312312321321312321',
    adresseCourr : 'dex@gmail.qwe',
    numTel : '438-888-88',
    lettre_de_motivation: 'abc',
    resume: 'bcd',
  },
  {
    nom: 'mosk1',
    prenom: 'danil1',
    adresseCourr : 'dex@gmail.qwe',
    numTel : '438-888-88',
    lettre_de_motivation: 'abc',
    resume: 'bcd',
  },{
    nom: 'mosk2',
    prenom: 'danil2',
    adresseCourr : 'dex@gmail.qwe',
    numTel : '438-888-88',
    lettre_de_motivation: 'abc',
    resume: 'bcd',
  },
  {
    nom: 'mosk2',
    prenom: 'danil2',
    adresseCourr : 'dex@gmail.qwe',
    numTel : '438-888-88',
    lettre_de_motivation: 'abc',
    resume: 'bcd',
  }
]

function handleRetour(){
  navigate('/EmployeurHomePage')
}
  return (
    <div>
  
    <div className='rootInfo'>
      <div className='divFormInfo'>
      <table>
      <caption> <h1 className='text-center'>INFORMATIONS ÉTUDIANTS POSTULÉS</h1> </caption>
      <thead>
      <tr>
      <th scope="col" className='headerElement'>NOM</th>
      <th scope='col' className='headerElement'>PRENOM</th>
      <th scope='col' className='headerElement'>ADRESSE COURRIEL</th>
      <th scope='col'className='headerElement'>NUMERO DE TELEPHONE</th>
      <th scope='col'className='headerElement'>RESUME</th>
      <th scope='col'className='headerElement'>LETTRE DE MOTIVATION</th>
      <th scope='col'className='headerElement text-center'>ACTION</th>
      </tr>  
      </thead> 
      <tbody>
      {listeEtudiants.map((etudiant, i) => (
      <tr key={i} > 
      <td data-label="NOM" scope="row" className='headerElement breakWord'>{etudiant.nom}</td>
      <td  data-label="PRENOM" className='headerElement breakWord'><p className='breakWord'>{etudiant.prenom}</p></td>
      <td data-label="ADRESSE COURRIEL"className='headerElement'>{etudiant.adresseCourr}</td>
      <td data-label="NUMERO DE TELEPHONE"className='headerElement'>{etudiant.numTel}</td>
      <td data-label="LETTRE DE MOTIVATION"className='headerElement'>{etudiant.lettre_de_motivation}</td>
      <td data-label="RESUME"className='headerElement'>{etudiant.resume}</td>
      <button className='btn btn-warning me-3'>CONVOQUER</button>
      </tr>
    ))}
    </tbody>
    </table>
    <div className='d-flex justify-content-end me-3 mt-5'>
    <button className='btn btn-danger ' onClick={handleRetour}>RETOUR </button>
    </div>
    </div>
    </div>
    </div>
  )
}

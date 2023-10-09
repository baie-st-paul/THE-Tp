import React from 'react'
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './informationEtudiantPostule.css'
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import Modal from "../../../GestionnaireHomePage/Vetocv/Modal";

export default function InformationEtudiantPostule({listeEtudiants}) {
  const navigate = useNavigate();
  const location = useLocation();
  listeEtudiants = location.state.listeEtudiants
  const [openModal, setOpenModal] = useState(false);
  const [openModalLettre, setOpenModalLetttre] = useState(false)
  const [student, setStudent] = useState(null);

  function handleMontrerCv(student){
    setOpenModal(!openModal)
    setStudent(student)
  }
  function handleRetour(){
    navigate('/EmployeurHomePage')
  }

  function handleConvoquerEntrevue() {
    navigate('/createEntrevue')
  }

  function handleMontrerLettre(student){
    setOpenModalLetttre(!openModalLettre)
    setStudent(student)
  }
    return (
        <div className='mt-5'>
          <div className='rootInfo'>
            <div className='divFormInfo'>
              <table>
                <caption> <h1 className='text-center'>LISTE D'ÉTUDIANTS POSTULÉS</h1> </caption>
                <thead>
                <tr>
                  <th scope="col" className='headerElement'>NOM</th>
                  <th scope='col' className='headerElement'>PRENOM</th>
                  <th scope='col' className='headerElement'>ADRESSE COURRIEL</th>
                  <th scope='col'className='headerElement'>NUMERO DE TELEPHONE</th>
                  <th scope='col'className='headerElement text-center'>RESUME</th>
                  <th scope='col'className='headerElement'>LETTRE DE MOTIVATION</th>
                  <th scope='col'className='headerElement text-center'>ACTION</th>
                </tr>
                </thead>
                <tbody>
                {listeEtudiants.map((etudiant, i) => (
                    <tr key={i} >
                      <td data-label="NOM" scope="row" className='headerElement breakWord'>{etudiant.student.firstName}</td>
                      <td  data-label="PRENOM" className='headerElement breakWord'>{etudiant.student.lastName}</td>
                      <td data-label="ADRESSE COURRIEL"className=' headerElement'>{etudiant.student.email}</td>
                      <td data-label="NUMERO DE TELEPHONE"className=' headerElement'>{etudiant.student.phoneNumber}</td>
                      <td data-label="RESUME"className='headerElement '><button className='btn btn-info p-3' onClick={()=>handleMontrerCv(etudiant)}>RESUME</button>  </td>
                      <td data-label="LETTRE DE MOTIVATION"className='headerElement'><button className='btn btn-info p-lg-1 p-md-1 p-sm-3' onClick={()=> handleMontrerLettre(etudiant)}>LETTRE MOTIVATION</button></td>
                      <td><button className='btn btn-warning p-3' onClick={handleConvoquerEntrevue}>CONVOQUER</button></td>
                    </tr>
                ))}
                </tbody>
              </table>
              {openModal &&
                  <Modal cv={student.cvStudent.file_cv} fileName={student.cvStudent.fileName} onClose={handleMontrerCv} />
              }
              {openModalLettre &&
                  <Modal cv={student.lettreMotivation} fileName={student.fileName} onClose={handleMontrerLettre} />
              }
              <div className='d-flex justify-content-end mt-5 p-3'>
                <button className='btn btn-danger p-2 ' onClick={handleRetour}>RETOUR</button>
              </div>
            </div>
          </div>
        </div>
    )
  }

import React from 'react'
import Modal from 'react-bootstrap/Modal';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './informationEtudiantPostule.css'
import { Button } from 'react-bootstrap';
export default function InformationEtudiantPostule() {
  return (
    <div className='root vh-100'>
      <div className='divFormInfo  '>
      <h1 className="h2 text-center p-3">INFORMATION ÉTUDIANT POSTULÉ</h1>
      <div className='border m-2 border-dark'>
      <div className='px-5 mt-5'>
      <h3>NOM</h3>
      <h3>PRENOM</h3>
      <h3>ADRESSE COURRIEL</h3>
      <h3>NUMERO DE TELEPHONE</h3>
      <button className='m-0 mt-2 btn btn-success'>LETTRE DE MOTIVATION</button>
      <button className='m-0 mt-2 mx-2 btn btn-success'>RESUME</button>
      </div>
      <div className='d-flex mt-5 justify-content-end mb-3 me-2'>
      <button className='btn btn-warning'>CONVOQUER</button>
      <button className='btn btn-danger' >RETOUR</button>
      </div>
      </div>
      </div>
      </div>
  )
}

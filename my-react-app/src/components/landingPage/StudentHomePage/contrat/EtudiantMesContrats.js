import React from 'react'
import { useState , useEffect } from "react";
import ReactModal from "react-modal";

export default function EtudiantMesContrats({matricule, contratsTest}) {
  const [contrats, setContrats] = useState(contratsTest)
  const  [filtre, setFiltre] = useState('')  
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState("");
  const [contrat, setContrat] = useState(null)
  const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

  useEffect(() => {
    fetchContrats()
  } , []
  )

  const fetchContrats = async () => {
    try {
      const res = await fetch(
          `http://localhost:8081/api/v1/student/student-contracts/${matricule}`,
          {
              method: 'GET',
              headers: {
                  'Content-type': 'application/json',
                  Authorization : 'Bearer ' + localStorage.getItem('token')
              },
              withCredentials: true
          }
      );
      if (res.ok) {  
          const data = await res.json();
          setContrats(data)
          console.log(data)
      } else {
          const data = await res.json(); 
          console.log('Erreur', res.status, data);
         
      }
  } catch (error) {
      console.log('Une erreur est survenue:', error);
      setContrats(contratsTest)
      console.log(contrats) 
      
  }
}

const handleSignerContrat = async (contrat) => {
console.log(contrat)
const token = localStorage.getItem('token');
try{
    fetch(
        `http://localhost:8081/api/v1/student/signerContrat`,
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            withCredentials: true,
            body : JSON.stringify(contrat)
        }
    ).catch(error => {
        console.log(error)
    }).then(
        async (res) => {
            try {
                console.log(res.status)
                if (res.ok) {
                    const data = await res.json();
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (e) {
                console.log(e)
            }
        })
} catch (error) {
    console.log('Une erreur est survenue:', error);
}
}

const handleAcceptConfirmation = () => {
    setIsConfirmationModalOpen(false);
    console.log("Accepted")
    let arrTmp = [...contrats]
    let idx = arrTmp.findIndex((x) => x.id === contrat.id)
    arrTmp[idx].statutEtudiant = 'Signer'
    setContrats(arrTmp)
    handleSignerContrat(contrat)
};

const handleRefuseConfirmation = () => {
    setIsConfirmationModalOpen(false);
};

const openConfirmationModal = (type, contrat1) => {
    setIsConfirmationModalOpen(true);
    setContrat(contrat1)
    setConfirmationType(type)
    
};

const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
};


  return (
       <div className="container w-100">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="display-5 text-center m-2 mb-5">Mes Contrats</h1>
                </div>
              {contrats.length > 0  ?
                <div className="table-responsive table-container">
                    <table className="table w-100 text-start">
                        <thead>
                        <tr>
                            <th className='header-cell h5'>Nom de compagnie</th>
                            <th className='header-cell h5'>Poste</th>
                            <th className="header-cell h5">Signé par étudiant</th>
                            <th className="header-cell h5">Signé par employeur</th>
                            <th className="header-cell h5" >Signé par gestionnaire</th>
                        </tr>
                        </thead>
                        <tbody className='w-100'>
                         {contrats.length > 0  && contrats
                            .map((etudiant, index) => (
                                <tr key={index} className="table-row align-middle">
                                    <td data-label="Compagnie" className="fw-semibold">{etudiant.nomDeCompagnie}</td>
                                    <td data-label="Poste" className="fw-semibold">{etudiant.nomDePoste}</td>
                                    {
                                    etudiant.statutEtudiant === 'Pas_Signer' ?
                                    <td data-label="Signé par étudiant"><button className='m-0 text-center btn btn-primary' onClick={()=>openConfirmationModal('accept',etudiant)}><span className='h6'>Signer le contrat</span></button></td>
                                    :
                                    <td data-label="Signé par étudiant" className="fw-semibold">Signé</td>
                                    }
                                    <td data-label="Signé par employeur" className="fw-semibold">{etudiant.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                    <td data-label="Signé par gestionnaire" className="fw-semibold">{etudiant.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                </tr>
                            ))  
                        }
                        </tbody>
                    </table>
                </div>
                : <div>AUCUN CONTRAT A AFFICHER</div> }
         </div>
                   
                    <ReactModal
                        isOpen={isConfirmationModalOpen}
                        onRequestClose={closeConfirmationModal}
                        style={customStyles}
                        ariaHideApp={false}
                        contentLabel="Confirmation Modal"
                    >
                        <h2 title="Confirmation modal">Confirmation</h2>
                        {confirmationType === "accept" ? (
                            <>
                                <p>Êtes-vous sûr de vouloir signer le contrat ?</p>
                                <button title="ConfirmAccept" className="btn btn-success" onClick={handleAcceptConfirmation}>
                                    Oui
                                </button>
                            </>
                        ) : (
                            <>
                                <p>Êtes-vous sûr de vouloir refuser cet étudiant ?</p>
                                <button title="ConfirmRefuse" className="btn btn-danger" onClick={handleRefuseConfirmation}>
                                    Oui
                                </button>
                            </>
                        )}
                        <button title="ConfirmNon" className="btn btn-secondary" onClick={closeConfirmationModal}>
                            Non
                        </button>
                    </ReactModal>                

        </div>
  )
}

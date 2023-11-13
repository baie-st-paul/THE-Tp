import React from 'react'
import { useState , useEffect } from "react";

export default function EtudiantMesContrats({matricule, contratsTest}) {
  const [contrats, setContrats] = useState(contratsTest)
  const  [filtre, setFiltre] = useState('')  
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
                                    <td data-label="Poste" className="fw-semibold">{etudiant.nomDeCompany}</td>
                                    <td data-label="Signé par étudiant" className="fw-semibold">{etudiant.statutEtudiant === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
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
        </div>
  )
}

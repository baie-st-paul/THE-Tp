import React from 'react'
import { useState , useEffect } from "react";

export default function EmployeurMesContrats({employerId}) {
  const [contrats, setContrats] = useState([])

  useEffect(() => {
    fetchContrats()
  } , []
  )

  const fetchContrats = async () => {
    try {
      const res = await fetch(
          `http://localhost:8081/api/v1/employers/employer-contracts/${employerId}`,
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
      setContrats([])
  }
}





  return (
       <div className="container w-100">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="display-5 text-center m-2 mb-5">Mes Contrats</h1>
                </div>
                <div className="table-responsive table-container">
                    <table className="table w-100">
                        <thead>
                        <tr>
                            <th className="header-cell h5">Nom Etudiant</th>
                            <th className='header-cell h5'>Poste</th>
                            <th className="header-cell h5">Signé par étudiant</th>
                            <th className="header-cell h5">Signé par employeur</th>
                            <th className="header-cell h5" >Signé par gestionnaire</th>
                        </tr>
                        </thead>
                        <tbody>
                      { /*   {etudiants.length > 0 && etudiants.filter(etudiantNf => etudiantNf.etudiant?.matricule?.includes(filtre))
                            .map((etudiant, index) => (
                                <tr key={index} className="table-row align-middle">
                                    <td className="fw-semibold">{etudiant.etudiant.firstName}</td>
                                    <td className="fw-semibold">{etudiant.etudiant.lastName}</td>
                                    <td className="fw-semibold">{etudiant.etudiant.matricule} </td>
                                    <td className="fw-semibold">{etudiant.employer.companyName} </td>
                                    <td className="fw-semibold">{etudiant.dateHeure} </td>
                                </tr>
                            ))
                        } */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

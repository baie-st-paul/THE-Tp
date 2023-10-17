import React, { useEffect } from 'react'
import { useState } from "react";


export default function EtudiantsConvoquesEntrevue() {
    const  [etudiants, setEtudiants] = useState([])
    const  [filtre, setFiltre] = useState('')
    const ett = [{
    nom : 'danil',
    prenom : 'moskalenko',
    matricule : '1111111',
    nomCompagnie : 'Bell',
    dateHeure : 'today'
   },
   {
    nom : 'max',
    prenom : 'moss',
    matricule : '2222222',
    nomCompagnie : 'Videotron',
    dateHeure : 'tommorow'
   },
]

useEffect(() => {
setEtudiants(ett)
        /*
            try {
             const res = fetch(
                    `http://localhost:8081/api/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-type': 'application/json',
                        }
                    }
                );
                if (res.ok) {
                    const data =  res.json();
                    setEtudiants(data);
                } else {
                    const data =  res.json();
                    console.log('Erreur', res.status, data);
                }
            } catch (error) {
                console.log('Une erreur est survenue:', error);
                }
                */
            }, []
    )

  return (
    <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-12">
                    <h1 className="display-4 text-center m-2">Étudiants convoqué(es) a l'entrevue</h1>
                </div>
            <div className="table-responsive table-container">
                <div className='text-start mt-3'> <label ><h3>Trouver par matricule &nbsp; </h3></label>
                <input onChange={ (event)=> setFiltre(event.target.value)}></input>
                </div>
                <table className="table custom-table">
                    <thead>
                    <tr>
                        <th className="header-cell display-6">Nom</th>
                        <th className="header-cell display-6">Prenom</th>
                        <th className="header-cell display-6">Matricule</th>
                        <th className="header-cell display-6">Nom de compagnie</th>
                        <th className="header-cell display-6">Date et heure </th>
                    </tr>
                    </thead>
                    <tbody>
                     {etudiants.filter(etudiantNf => etudiantNf.matricule.includes(filtre)).map((etudiant, index) => (
                        <tr key={index} className="table-row align-middle">
                            <td className="fw-semibold">{etudiant.nom}</td>
                            <td className="fw-semibold">{etudiant.prenom}</td>
                            <td className="fw-semibold">{etudiant.matricule} </td>
                            <td className="fw-semibold">{etudiant.nomCompagnie} </td>
                            <td className="fw-semibold">{etudiant.dateHeure} </td>
                            </tr>
                     ))
                     }
                        </tbody>
                        </table>
    </div>
    </div>
    </div>
  )
}

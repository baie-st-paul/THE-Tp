import React, { useEffect } from 'react'
import { useState } from "react";

export default function EtudiantsConvoquesEntrevue() {
    const  [etudiants, setEtudiants] = useState([])
    const  [filtre, setFiltre] = useState('')

    useEffect(() => {
        getEtudiants();
    },[])

    async function getEtudiants() {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(
                `http://localhost:8081/api/v1/gestionnaire/studentsWithEntrevue`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                }
            );
            if (res.ok) {
                const data = await res.json();
                console.log(data)
                setEtudiants(data);
            } else {
                const data = await res.json();
                console.log('Erreur', res.status, data);
            }
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
    }

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
                            <th className="header-cell display-6">id compagnie</th>
                            <th className="header-cell display-6">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {etudiants.length > 0 && etudiants.filter(etudiantNf => etudiantNf.student?.matricule?.includes(filtre))
                            .map((etudiant, index) => (
                                <tr key={index} className="table-row align-middle">
                                    <td className="fw-semibold">{etudiant.student.firstName}</td>
                                    <td className="fw-semibold">{etudiant.student.lastName}</td>
                                    <td className="fw-semibold">{etudiant.student.matricule} </td>
                                    <td className="fw-semibold">{etudiant.offreStage.id} </td>
                                    <td className="fw-semibold">{etudiant.offreStage.dateDebut} </td>
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

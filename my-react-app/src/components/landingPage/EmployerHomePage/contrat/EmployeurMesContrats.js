import React from 'react'
import { useState , useEffect } from "react";

export default function EmployeurMesContrats({employerId, contratsTest}) {
    const [contrats, setContrats] = useState(contratsTest)
    const [filtre, setFiltre] = useState('')

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchContrats()
    } , [])

    const fetchContrats = async () => {
        try {
            console.log(employerId)
            fetch(
                `http://localhost:8081/api/v1/employers/employer-contracts/${employerId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: 'Bearer ' + token
                    },
                    withCredentials: true,
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.ok) {
                            const data = await res.json()
                            setContrats(data)
                            console.log(data)
                        }
                        else {
                            const data = await res.json();
                            console.log('Erreur', res.status, data);
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
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
                        <div className='text-start mt-3 mb-2'> <label ><h4>Trouver par matricule &nbsp; </h4></label>
                            <input data-testid="input" onChange={ (event)=> setFiltre(event.target.value)}></input>
                        </div>
                        <table className="table w-100 text-start">
                            <thead>
                            <tr>
                                <th className="header-cell h5">Nom, Prénom</th>
                                <th className="header-cell h5">Matricule</th>
                                <th className='header-cell h5'>Poste</th>
                                <th className="header-cell h5">Signé par étudiant</th>
                                <th className="header-cell h5">Signé par employeur</th>
                                <th className="header-cell h5" >Signé par gestionnaire</th>
                            </tr>
                            </thead>
                            <tbody className='w-100'>
                            {contrats.length > 0  && contrats.filter(etudiantNf => etudiantNf.studentId.includes(filtre))
                                .map((etudiant, index) => (
                                    <tr key={index} className="table-row align-middle">
                                        <td  data-label="Nom" className="fw-semibold">{etudiant.nomEtudiant + ', ' + etudiant.prenomEtudiant}</td>
                                        <td  data-label="Matricule" className="fw-semibold">{etudiant.studentId}</td>
                                        <td data-label="Poste" className="fw-semibold">{etudiant.nomDeCompanie}</td>
                                        <td data-label="Signé par étudiant" className="fw-semibold">{etudiant.statutEtudiant === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                        <td data-label="Signé par employeur" className="fw-semibold">{etudiant.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                        <td data-label="Signé par gestionnaire" className="fw-semibold">{etudiant.statutEmployeur === 'Pas_Signer' ? 'Signature requise' : 'Signé'} </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    : <div>AUCUN CONTRAT À AFFICHER</div> }
            </div>
        </div>
    )
}

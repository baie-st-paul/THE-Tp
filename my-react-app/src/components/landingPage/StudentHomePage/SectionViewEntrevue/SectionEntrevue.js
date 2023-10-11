import React, { useState } from 'react';
import "./SectionEntrevue.css"
const SectionEntrevue = () =>{
    const [entrevues, setEntrevues] = useState([
        {
            entreprise: "Entreprise A",
            dateHeure: "2023-10-15 14:00",
            description: "Entrevue pour un poste de développeur",
            statut: "en attente", // Vous pouvez utiliser un état pour suivre le statut (accepté, refusé, en attente)
        },
        {
            entreprise: "Entreprise B",
            dateHeure: "2023-10-20 10:30",
            description: "Entrevue pour un poste de designer",
            statut: "accepté",
        },
        {
            entreprise: "Entreprise C",
            dateHeure: "2023-10-25 15:45",
            description: "Entrevue pour un poste de marketing",
            statut: "refusé",
        },
    ]);

    return (
        <div>
            <h1>Liste des Entrevues</h1>
            <table>
                <thead>
                <tr>
                    <th>Entreprise</th>
                    <th>Date et Heure</th>
                    <th>Description</th>
                    <th>Statut</th>
                </tr>
                </thead>
                <tbody>
                {entrevues.map((entrevue, index) => (
                    <tr key={index}>
                        <td>{entrevue.entreprise}</td>
                        <td>{entrevue.dateHeure}</td>
                        <td>{entrevue.description}</td>
                        <td>
                            <select value={entrevue.statut}>
                                <option value="accepté">Accepté</option>
                                <option value="refusé">Refusé</option>
                                <option value="en attente">En Attente</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SectionEntrevue
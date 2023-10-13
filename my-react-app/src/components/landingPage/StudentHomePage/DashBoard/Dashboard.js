import React, {useState} from "react";
import "./Dashboard.css";
import EntrevueItemDashboard from "./EntrevueItemDashboard";
const Dashboard = () =>{
    const [entrevues, setEntrevues] = useState([
        {
            entreprise: "Entreprise A",
            dateHeure: "2023-10-15T14:00:00",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " +
                "printer took a galley of type and scrambled it to make a type specimen book. It has survived not only " +
                "five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " +
                "It was popularised in the 1960s with the release of Letraset sheets containing " +
                "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker " +
                "including versions of Lorem Ipsum.",
            status: "En_attente"
        },
        {
            entreprise: "Entreprise A",
            dateHeure: "2023-10-15T14:00:00",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " +
                "printer took a galley of type and scrambled it to make a type specimen book. It has survived not only " +
                "five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " +
                "It was popularised in the 1960s with the release of Letraset sheets containing " +
                "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker " +
                "including versions of Lorem Ipsum.",
            status: "En_attente"
        },
        {
            entreprise: "Entreprise B",
            dateHeure: "2023-10-20T10:30:00",
            description: "Entrevue pour un poste de designer",
            statut: "Accepté",
            status: "En_attente"
        },
        {
            entreprise: "Entreprise C",
            dateHeure: "2023-10-25T15:45:00",
            description: "Entrevue pour un poste de marketing",
            statut: "Refusé",
            status: "En_attente"
        },
        {
            entreprise: "Entreprise B",
            dateHeure: "2023-10-20T10:30:00",
            description: "Entrevue pour un poste de designer",
            statut: "Accepté",
            status: "En_attente"
        },
        {
            entreprise: "Entreprise C",
            dateHeure: "2023-10-25T15:45:00",
            description: "Entrevue pour un poste de marketing",
            statut: "Refusé",
            status: "En_attente"
        },
    ]);
    return(
        <div className="container">
            <h1>Dashboard</h1>
            <div className="row">
                <div className="list-group col-lg-7 p-1" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div className="list-group-item bg-body-secondary mb-1">
                        <h1>Nouvelles Entrevues</h1>
                    </div>
                    {entrevues.length === 0 ? (
                        <div className="list-group-item no-entrevues-message">
                            <div className="centered">
                                <p>Aucune entrevue disponible pour le moment</p>
                            </div>
                        </div>
                    ) : (
                        entrevues.map((item, index) => (
                            <EntrevueItemDashboard
                                key={index}
                                nomEntreprise={item.entreprise}
                                entrevue={item}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
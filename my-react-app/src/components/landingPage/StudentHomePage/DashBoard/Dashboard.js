import React, {useState} from "react";
import "./Dashboard.css";
import EntrevueItemDashboard from "./EntrevueItemDashboard";
const Dashboard = () =>{
    const [entrevues, setEntrevues] = useState([
        {
            entreprise: "Entreprise sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
            dateHeure: "2023-10-15T14:00:00",
            description: "Lorem Ipsum is simply dummy text...",
        },
        {
            entreprise: "Entreprise B",
            dateHeure: "2023-10-20T10:30:00",
            description: "Entrevue pour un poste de designer",
            statut: "Accepté",
        },
        {
            entreprise: "Entreprise C",
            dateHeure: "2023-10-25T15:45:00",
            description: "Entrevue pour un poste de marketing",
            statut: "Refusé",
        },
        {
            entreprise: "Entreprise D",
            dateHeure: "2023-10-30T09:15:00",
            description: "Entrevue for a software developer role",
            statut: "En attente",
        },
        {
            entreprise: "Entreprise E",
            dateHeure: "2023-11-05T11:00:00",
            description: "Entrevue pour un poste de chef de projet",
            statut: "Accepté",
        },
        // Add more entries below
        {
            entreprise: "Entreprise F",
            dateHeure: "2023-11-10T15:30:00",
            description: "Entrevue for a sales position",
            statut: "En attente",
        },
        {
            entreprise: "Entreprise G",
            dateHeure: "2023-11-15T13:45:00",
            description: "Entrevue for a marketing manager role",
            statut: "Accepté",
        },
        {
            entreprise: "Entreprise H",
            dateHeure: "2023-11-20T14:30:00",
            description: "Entrevue for a financial analyst position",
            statut: "Refusé",
        },
    ]);

    return(
        <div className="container">
            <div className="row">
                <div className="list-group col-lg-7 p-1" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div className="list-group-item bg-body-secondary">
                        <h1>Nouvelles Entrevues</h1>
                    </div>
                    {entrevues.map((item, index) => (
                        <EntrevueItemDashboard
                            key={index}
                            nomEntreprise={item.entreprise}
                            entrevue={item}
                        />
                    ))}
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-4 bg-info">
                    <h1>Nouvelles Offres</h1>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-lg-5 bg-black">
                    <p>ss</p>
                </div>
                <div className="col-lg-2">

                </div>
                <div className="col-lg-5 bg-info">
                    <p>ss</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
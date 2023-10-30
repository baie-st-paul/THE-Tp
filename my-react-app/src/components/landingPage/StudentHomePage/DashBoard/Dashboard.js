import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import EntrevueItemDashboard from "./EntrevueItemDashboard";

const Dashboard = () =>{
    const [entrevues, setEntrevues] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");
        fetch(
            `http://localhost:8081/api/v1/stages/entrevues/students/${savedMatricule}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
            }
        ).catch((error) => {
            console.error("Error:", error);
        }).then(
            async (response) => {
                const data = await response.json();
                setEntrevues(data)
                console.log(response.status)
                try{
                    console.log(response.status)
                }
                catch (e) {
                    console.log(e)
                }
                setIsLoading(false);
            }
        );

    }, [shouldRefetch]);

    const entrevuesEnAttente = entrevues.filter(entrevue => entrevue.status === "EnAttente");

    return(
        <div>
            <h1 className="display-4 text-center">Dashboard</h1>
            <div className="row">
                <div className="list-group col-lg-7 p-1" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div className="list-group-item bg-body-secondary mb-1">
                        <h1>Nouvelles Entrevues</h1>
                    </div>
                    {entrevuesEnAttente.length === 0 ? (
                        <div className="list-group-item no-entrevues-message">
                            <div className="centered">
                                <p>Aucune entrevue disponible pour le moment</p>
                            </div>
                        </div>
                    ) : (
                        entrevuesEnAttente.map((item, index) => (
                            <EntrevueItemDashboard
                                key={index}
                                nomEntreprise={item.companyName}
                                entrevue={item}
                                setShouldRefetch={setShouldRefetch}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

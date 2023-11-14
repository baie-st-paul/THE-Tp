import React, {useEffect, useState} from "react";
import "./Dashboard.css";
import EntrevueItemDashboard from "./EntrevueItemDashboard";

const Dashboard = ({entrevuesTest}) => {
    const [entrevues, setEntrevues] = useState(entrevuesTest);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const token = localStorage.getItem('token');
    const savedMatricule = localStorage.getItem("loggedInUserMatricule");

    useEffect(() => {
        getStudentEntrevues()
    }, [shouldRefetch]);

    async function getStudentEntrevues() {
        try {
            console.log(savedMatricule)
            fetch(
                `http://localhost:8081/api/v1/stages/entrevues/students/${savedMatricule}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
                }
            ).catch(error => {
                console.log(error)
            }).then(
                async (res) => {
                    const data = await res.json()
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setEntrevues(data)
                    console.log(data)
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
            if (entrevues !== undefined){
                setEntrevues(entrevues)
            }
        }
    }

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

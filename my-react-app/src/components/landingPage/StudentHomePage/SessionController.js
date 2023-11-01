import React, { useState } from 'react';

const SessionController = ({ sessionTag, studentTag }) => {
    const [message, setMessage] = useState('');

    const handleReinscription = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8081/api/v1/student/reinscriptionANouvelleSession//${localStorage.getItem("loggedInUserMatricule")}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
                redirect: "follow",
                mode: "no-cors"
            });
            if (response.ok) {
                const data = await response.json();
                console.log("this is 1" + data)
                setMessage(data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDesinscription = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8081/api/v1/student/deleteStudentByMatricule/${localStorage.getItem("loggedInUserMatricule")}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
                redirect: "follow",
                mode: "no-cors"
            });
            if (response.ok) {
                const data = await response.json();
                console.log("this is 1" + data)
                setMessage(data);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container text-center">
            <p className="mt-5 mb-3" style={{ fontSize: '24px' }}>
                Vous êtes inscrit à la session {studentTag}
            </p>
            <div className="row">
                <div className="col-md">
                    <button className="btn btn-success btn-block" onClick={handleReinscription}>
                        Je me réinscris à cette session {sessionTag}
                    </button>
                </div>
                <div className="col-md">
                    <button className="btn btn-danger btn-block" onClick={handleDesinscription}>
                        Je souhaite me désinscrire de la plateforme
                    </button>
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SessionController;
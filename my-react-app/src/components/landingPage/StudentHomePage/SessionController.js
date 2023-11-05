import React, { useState } from 'react';

const SessionController = ({ sessionTag, studentTag }) => {
    const [message, setMessage] = useState('');

    async function handleReinscription() {
        try {
            const token = localStorage.getItem('token');
            const matricule = localStorage.getItem("loggedInUserMatricule")
            console.log(matricule)

            fetch(
                `http://localhost:8081/api/v1/student/reinscriptionANouvelleSession/${matricule}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
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
                            const data = await res.json();
                            console.log("this is 1" + data)
                            setMessage(data);
                        } else {
                            console.error("Failed to fetch data");
                        }
                    } catch (e) {
                        console.log(e)
                    }
                })
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
        window.location.reload();
    }

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
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

export default SessionController;

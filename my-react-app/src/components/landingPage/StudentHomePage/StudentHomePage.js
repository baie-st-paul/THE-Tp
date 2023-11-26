import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import { useUser } from "../../../Providers/UserProvider";
import SessionController from "./SessionController";
import CardPageCvSignature from "./dashboardS/cards/cvSignature/CardPageCvSignature";
import DashboardPageStudent from "./dashboardS/DashboardPageStudent";
import NavBarStudent from "../NavBar/student/NavBarStudent";
import FetchsStudent from "../NavBar/student/FetchsStudent";

const StudentHomePage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();

    const [signature, setSignature] = useState(null);
    const [cv, setCv] = useState(null);
    const [sessions, setSessions] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (loggedInUser && loggedInUser.matricule) {
            localStorage.setItem("loggedInUserMatricule", loggedInUser.matricule);
        }

        setSignature(FetchsStudent.fetchSignature(token, signature, setSignature))
        setCv(FetchsStudent.fetchCv(token, cv, setCv))
        fetchCurrentSession()
    }, [loggedInUser, setLoggedInUser]);

    async function fetchCurrentSession() {
        try {
            const m = localStorage.getItem("loggedInUserMatricule")
            console.log(m)
            fetch(
                `http://localhost:8081/api/v1/student/getSessions/${m}`,
                {
                    method: 'GET',
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
                            console.log(data)
                            setSessions(data);
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
    }

    return (
        <div>
            {sessions.at(2) ?  (
                <div className="student-homepage">
                    <NavBarStudent/>
                    <div id="Render" className="container content-container mt-4">
                        <h2>Étudiant</h2>
                        {
                            signature !== null && cv !== null && cv.status === "Accepted" ?
                                <DashboardPageStudent/> : <CardPageCvSignature signature={signature} cv={cv}/>
                        }
                    </div>
                </div>
            ) : (
                <SessionController sessionTag={sessions.at(0)} studentTag={sessions.at(1)}/>
            )}
        </div>
    );
};

export default StudentHomePage;

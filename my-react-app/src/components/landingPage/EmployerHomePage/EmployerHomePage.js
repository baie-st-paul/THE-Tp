import React, {useEffect} from "react";
import { useState } from "react";
import DashboardPageEmp from "./dashboard/DashboardPageEmp";
import NavBarEmployeur from "../NavBar/employer/NavBarEmployeur";
import FetchsEmployer from "../NavBar/employer/FetchsEmployer";
import CardPageSignature from "./dashboard/cards/signature/CardPageSignature";

const EmployerHomePage = () => {
    const [signature, setSignature] = useState(null)

    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');

    useEffect(() => {
        setSignature(FetchsEmployer.fetchSignature(token, employerId, signature, setSignature))
    }, []);

    return (
        <div>
            <NavBarEmployeur/>
            <div id="Render" className="container content-container mt-4">
                <h2>Employeur</h2>
                {
                    signature !== null ? <DashboardPageEmp/> : <CardPageSignature/>
                }
            </div>
        </div>
    )
}

export default EmployerHomePage

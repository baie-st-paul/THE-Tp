import React from "react";
import EmployerStageOffreList from "./EmployerStageOffreList";

const EmployeurHomePage = ({employerId}) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto"></ul>
                </div>
            </nav>
            <EmployerStageOffreList employerId={employerId}/>
        </div>
    )
}

export default EmployeurHomePage

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const EntrevueItemDashboard = ({ nomEntreprise , entrevue}) =>{
    return(
        <div className="list-group-item list-group-item-action list-group-item-warning entrevue">
            <FontAwesomeIcon icon={faExclamationTriangle} className="beat" size="lg" style={{ color: "#e51010", marginRight: 5 }} />
            <span className="fs-5 fw-bold">{nomEntreprise}</span>
            <span className="fw-semibold"> vient de vous convoquer à une entrevue</span>
            <button type="button" className="btn btn-primary btn-sm">
                Voir entrevue
            </button>
        </div>
    );
}

export default EntrevueItemDashboard;
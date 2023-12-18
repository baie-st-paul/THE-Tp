import React from "react";
import "./CardPageSignature.css"
import error_cv_signature from "../../../../../../images/error_cv_signature.gif"

const CardPageSignature = () => {
    return (
        <div className="text-center m-0 p-0"
             style={{justifyContent: "center"}}>
            <img style={{width: "400px"}}
                src={error_cv_signature}
                alt="Ajouter une signature"
                className="img-fluid"
            />
            <div>Ajouter une signature !</div>
            <p className="lead">Le tableau de bord sera affiché par la suite</p>
        </div>
    )
}

export default CardPageSignature

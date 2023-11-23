import React from "react";
import "./CardPageSignature.css"

const CardPageSignature = () => {
    return (
        <div className="container text-center mt-5" style={{justifyContent: "center", display: "flex"}}>
            <div style={{width: "500px"}}>
                <img
                    src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                    alt="Ajouter une signature"
                    className="img-fluid"
                />
                <div>Ajouter une signature !</div>
                <p className="lead">Le tableau de bord sera affiché par la suite</p>
            </div>
        </div>
    )
}

export default CardPageSignature

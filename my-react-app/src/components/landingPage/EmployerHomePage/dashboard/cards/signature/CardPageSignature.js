import React from "react";
import "./CardPageSignature.css"

const CardPageSignature = () => {
    return (
        <div className="container text-center mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <img
                        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                        alt="Ajouter une signature"
                        className="img-fluid"
                    />
                    <h1 className="mt-4">Ajouter une signature !</h1>
                    <p className="lead">Le tableau de bord sera affiché par la suite</p>
                </div>
            </div>
        </div>
    )
}

export default CardPageSignature

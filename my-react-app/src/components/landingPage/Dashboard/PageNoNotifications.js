import checkMark from "../../../images/check_mark.gif"
import React from "react";

const PageNoNotifications = () => {
    return (
        <div style={{justifyContent: "center", display: "flex"}}>
            <div style={{width: "200px"}}>
                <img
                    src={checkMark}
                    alt="checkmark"
                    className="img-fluid"
                />
                <p className="lead">Vous êtes à jour</p>
            </div>
        </div>
    )
}

export default PageNoNotifications

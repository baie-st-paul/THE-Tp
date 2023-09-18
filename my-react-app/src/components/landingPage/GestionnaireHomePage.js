import React from "react";
import {Link} from "react-router-dom";

const GestionnaireHomePage = () => {
    return (
        <div>
            <h2>Gestionnarie</h2>
            <Link to='/saveCv' className='btn btn-block bg-dark m-0 mt-0 text-light'>
                <span style={{fontSize : '20px'}}>Enregistrer un CV</span>
            </Link>
        </div>
    )
}

export default GestionnaireHomePage

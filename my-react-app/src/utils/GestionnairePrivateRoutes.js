import {Outlet,Route,Navigate} from "react-router-dom";


const GestionnairePrivateRoutes = ({children,...rest}) => {
    let auth;
    if(localStorage.getItem('token') != null && localStorage.getItem("userType") === "Gestionnaire"){
        console.log("true")
        auth = true;
    }
    else {
        auth = false;
        console.log("false")
    }


    return(
        auth ? <Outlet/> : <Navigate to={"/connexionMain"}/>
    )
}

export default GestionnairePrivateRoutes
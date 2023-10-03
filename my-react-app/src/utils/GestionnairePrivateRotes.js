
import GestionnaireHomePage from "../components/landingPage/GestionnaireHomePage/GestionnaireHomePage";
import {Navigate} from "react-router-dom";


const GestionnairePrivateRoutes = ({children,...rest}) => {
    let auth;
    if(localStorage.getItem('token') != null && localStorage.getItem("user_type").match("Gestionnaire")){
        console.log("true")
        auth = true;
    }
    else {
        auth = false;
        console.log("false")
    }


    return(
        auth ? <GestionnaireHomePage/> : <Navigate to={"*"}/>
    )
}

export default GestionnairePrivateRoutes
import {Navigate} from "react-router-dom";
import EmployerHomePage from "../components/landingPage/EmployerHomePage/EmployerHomePage";


const EmployerPrivateRoutes = () => {
    let auth;
    console.log(localStorage.getItem("user_type"))
    if(localStorage.getItem('token') != null && localStorage.getItem("user_type").match("Employeur")){
        console.log("true")
        auth = true;
    }
    else {
        auth = false;
        console.log("false")
    }


    return(
        auth ? <EmployerHomePage/> : <Navigate to={"*"}/>
    )
}


export default EmployerPrivateRoutes


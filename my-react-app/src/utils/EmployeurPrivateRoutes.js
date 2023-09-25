import {Outlet,Route,Navigate} from "react-router-dom";
import EmployeurHomePage from "../components/landingPage/EmployerHomePage/EmployeurHomePage";


const EmployeurPrivateRoutes = ({children,...rest}) => {
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
        auth ? <EmployeurHomePage/> : <Navigate to={"*"}/>
    )
}

export default EmployeurPrivateRoutes
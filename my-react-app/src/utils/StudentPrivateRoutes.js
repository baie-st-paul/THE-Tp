import {Outlet,Route,Navigate} from "react-router-dom";
import StudentHomePage from "../components/landingPage/StudentHomePage";


const StudentPrivateRoutes = ({children,...rest}) => {
    let auth;
    console.log(localStorage.getItem("userType"))
    if(localStorage.getItem('token') != null && localStorage.getItem("userType") === "Student"){
        console.log("true")
         auth = true;
    }
    else {
        auth = false;
        console.log("false")
    }


    return(
        auth ? <StudentHomePage/> : <Navigate to={"/connexionMain"}/>
    )
}

export default StudentPrivateRoutes

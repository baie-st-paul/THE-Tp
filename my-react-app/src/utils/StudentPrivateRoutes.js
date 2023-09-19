import {Outlet,Route,Navigate} from "react-router-dom";
import StudentHomePage from "../components/landingPage/StudentHomePage";


const StudentPrivateRoutes = ({children,...rest}) => {
    let auth;
    if(localStorage.getItem('token') != null && localStorage.getItem("user_type").match("Student")){
        console.log("true")
         auth = true;
    }
    else {
        auth = false;
        console.log("false")
    }


    return(
        auth ? <StudentHomePage/> : <Navigate to={"*"}/>
    )
}

export default StudentPrivateRoutes

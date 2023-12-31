import {Navigate} from "react-router-dom";
import StudentHomePage from "../components/landingPage/StudentHomePage/StudentHomePage";


const StudentPrivateRoutes = () => {
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

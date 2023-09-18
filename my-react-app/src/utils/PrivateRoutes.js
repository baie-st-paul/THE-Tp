import {Outlet,Route,Navigate} from "react-router-dom";
import {isConnected} from "../components/utilisateurs/login/pages/ConnexionPage";
import {useUser} from "../Providers/UserProvider";

const PrivateRoutes = ({children,...rest}) => {
    const { loggedInUser } = useUser();
    let auth = false;
    if(loggedInUser != null){
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

export default PrivateRoutes
import NavBarGestionnaire from "../../NavBar/gestionnaire/NavBarGestionnaire";
import React, {useEffect, useState} from "react";
import FetchsGestionnaire from "../../NavBar/gestionnaire/FetchsGestionnaire";

const ProfilePageGes = () => {
    const [gestionnaire, setGestionnaire] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
        console.log(gestionnaire)
    }, []);

    const getFetchs = async () => {
        setGestionnaire(FetchsGestionnaire.fetchGestionnaire(token, gestionnaire, setGestionnaire))
    }

    return (
        <div>
            <NavBarGestionnaire/>
            <div id="render" className="container w-100">
                <h1 className="display-4 text-center">Profile</h1>
                {gestionnaire !== null &&
                    <div>
                        <div>{gestionnaire.firstName}</div>
                        <div>{gestionnaire.lastName}</div>
                        <div>{gestionnaire.email}</div>
                        <div>{gestionnaire.phoneNumber}</div>
                        <div>{gestionnaire.matricule}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfilePageGes

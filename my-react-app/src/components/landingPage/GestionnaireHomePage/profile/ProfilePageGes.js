import NavBarGestionnaire from "../../NavBar/gestionnaire/NavBarGestionnaire";
import React, {useEffect, useState} from "react";
import FetchsGestionnaire from "../../NavBar/gestionnaire/FetchsGestionnaire";
import profile from "../../../../images/profile.jpg"

const ProfilePageGes = () => {
    const [gestionnaire, setGestionnaire] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
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
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src={profile}
                                     alt="profile" className="rounded-circle" width="150"/>
                                <div className="mt-3">
                                    <h4>{gestionnaire.firstName + " " + gestionnaire.lastName}</h4>
                                    <p className="text-secondary mb-1">
                                        {gestionnaire.email}</p>
                                    <p className="text-secondary mb-1"><b>Tél.: </b>
                                        {gestionnaire.phoneNumber}</p>
                                    <p className="text-muted font-size-sm"><b>Matricule: </b>
                                        {gestionnaire.matricule}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProfilePageGes

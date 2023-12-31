import React, {useEffect, useState} from "react";
import FetchsGestionnaire from "../../NavBar/gestionnaire/FetchsGestionnaire";
import profile from "../../../../images/profile.jpg"
import {useNavigate} from "react-router-dom";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";

const ProfilePageGes = () => {
    const [gestionnaire, setGestionnaire] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setGestionnaire(FetchsGestionnaire.fetchGestionnaire(token, gestionnaire, setGestionnaire))
    }

    const handleDisconnect = () => {
        localStorage.clear()
        navigate('/');
    }

    const onInputUppercase = (string) => {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    };

    return (
        <div>
            {gestionnaire !== null &&
                <Card>
                    <Card.Body>
                        <div className="d-flex flex-column align-items-center text-center">
                            <img src={profile}
                                 alt="profile" className="rounded-circle" width="30"/>
                            <div className="mt-3">
                                <h4>{onInputUppercase(gestionnaire.firstName) + " " + onInputUppercase(gestionnaire.lastName)}</h4>
                                <p className="text-secondary mb-1">
                                    {gestionnaire.email}</p>
                                <p className="text-secondary mb-1"><b>Tél.: </b>
                                    {gestionnaire.phoneNumber}</p>
                                <p className="text-muted font-size-sm"><b>Matricule: </b>
                                    {gestionnaire.matricule}</p>
                            </div>
                            <div className="mt-3">
                                <button className="nav-link" onClick={() => handleDisconnect()}>
                                    <FontAwesomeIcon icon={faArrowRight} style={{marginTop:'5px', marginRight: '10px' }}/>
                                    Se déconnecter
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            }
        </div>
    )
}

export default ProfilePageGes

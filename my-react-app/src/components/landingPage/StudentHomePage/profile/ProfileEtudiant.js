import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "react-bootstrap/Card";
import profile from "../../../../images/profile.jpg";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FetchsStudent from "../../NavBar/student/FetchsStudent";

const ProfileEtudiant = () => {
    const [student, setStudent] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setStudent(FetchsStudent.fetchStudent(token, student, setStudent))
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
            {student !== null &&
                <Card>
                    <Card.Body>
                        <div className="d-flex flex-column align-items-center text-center">
                            <img src={profile}
                                 alt="profile" className="rounded-circle" width="30"/>
                            <div className="mt-3">
                                <h4>{onInputUppercase(student.firstName) + " " + onInputUppercase(student.lastName)}</h4>
                                <p className="text-secondary mb-1">
                                    {student.email}</p>
                                <p className="text-secondary mb-1"><b>Tél.: </b>
                                    {student.phoneNumber}</p>
                                <p className="text-muted font-size-sm"><b>Matricule: </b>
                                    {student.matricule}</p>
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

export default ProfileEtudiant

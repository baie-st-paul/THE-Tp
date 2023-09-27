import React, { useEffect, useState } from "react";
import "./StudentHomePage.css";
import FileUploader from "../../cv/FileUploader";
import { useUser } from "../../../Providers/UserProvider";
import {Nav, Navbar} from "react-bootstrap";

const StudentHomePage = () => {
    const { loggedInUser, setLoggedInUser } = useUser();
    const [matricule, setMatricule] = useState(null);
    const [activeContent, setActiveContent] = useState("none");

    useEffect(() => {
        const savedMatricule = localStorage.getItem("loggedInUserMatricule");

        if (savedMatricule) {
            setMatricule(savedMatricule);
        }

        if (loggedInUser && loggedInUser.matricule) {
            setMatricule(loggedInUser.matricule);
            localStorage.setItem("loggedInUserMatricule", loggedInUser.matricule);
        }
    }, [loggedInUser, setLoggedInUser]);

    let contentToRender = null;

    switch (activeContent) {
        case "file-uploader":
            contentToRender = <FileUploader matricule={matricule} />;
            break;
        default:
            contentToRender = <div>Select an action.</div>;
            break;
    }

    return (
        <div>
            <Navbar bg="dark" className="navbar-dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="nav-link" onClick={() => setActiveContent("file-uploader")}>
                                    Upload File
                                </button>
                            </li>
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="container mt-4">
                <h2>Student</h2>
                {contentToRender}
            </div>
        </div>
    );
};

export default StudentHomePage;

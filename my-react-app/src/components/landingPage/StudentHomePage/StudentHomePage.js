import React from "react";
import "./StudentHomePage.css"
import FileUploader from "../../cv/FileUploader";
const StudentHomePage = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    </ul>
                </div>
            </nav>

            <div className="container mt-4">
                <h2>Student</h2>
                <FileUploader></FileUploader>
            </div>
        </div>
    );
};

export default StudentHomePage;


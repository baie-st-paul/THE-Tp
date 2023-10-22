import React, { useState } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import "./FileUploader.css";

function FileUploader({matricule}) {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
        } else {
            setFile(null);
            setFileName("");
            setError("Please drop a valid PDF file.");
        }
    };

    const handleUpload = (event) => {
        event.preventDefault();
        console.log(matricule)
        const token = localStorage.getItem('token');
        if (file) {
            const formdata = new FormData();
            formdata.append("file_cv", file);

            const requestOptions = {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: formdata,
                redirect: "follow",
                mode: "no-cors"
            };

            fetch(
                `http://localhost:8081/api/v1/student/saveCV?matricule=${matricule}&fileName=${fileName}&status=In_review`,
                requestOptions
            )
                .then(() => {
                        setFile(null);
                        setFileName("");
                        setError(null);
                    })
                .catch((error) => console.log("error", error));
        } else {
            setError("Please select a valid PDF file before uploading.");
        }
        window.location.reload()
    };

    const handleCancel = () => {
        setFile(null);
        setFileName("");
        setError(null);
    };

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
        } else {
            setFile(null);
            setFileName("");
            setError("Please select a valid PDF file.");
        }
    };

    return (
        <div>
            <h1 className="display-4 text-center">CV</h1>
            <div
                className="d-flex flex-column justify-content-center align-items-center mt-5"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className="border border-1 border-dark p-5 text-center file-uploader">
                    <BiSolidCloudUpload className="upload-icon" />
                    <h3 className="mt-4">Glissez un fichier PDF ici</h3>
                    <span style={{ fontWeight: "bold" }}>Ou</span>
                    <br />
                    {file ? (
                        <>
                            {fileName && <div className="mt-3">Selected file: {fileName}</div>}
                            {error && <div className="text-danger mt-3">{error}</div>}
                            <button
                                onClick={handleUpload}
                                className="btn btn-primary mt-3"
                            >
                                Téléverser CV
                            </button>
                            <button
                                onClick={handleCancel}
                                className="btn btn-danger mt-3 ml-3"
                            >
                                Annuler
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileSelect}
                                style={{ display: "none" }}
                                id="fileInput"
                            />
                            <label htmlFor="fileInput" className="btn btn-primary mt-3">
                                Sélectionner un fichier PDF
                            </label>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileUploader;


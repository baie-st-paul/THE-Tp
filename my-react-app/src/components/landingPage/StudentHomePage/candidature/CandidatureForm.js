import React, {useState} from "react";
import {BiSolidCloudUpload} from "react-icons/bi";

const CandidatureForm = ({matricule, id, close}) => {
    const [lettreMotiv, setLettreMotiv] = useState(null);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setLettreMotiv(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
            close(false)
            window.location.reload()
        } else {
            setLettreMotiv(null);
            setFileName("");
            setError("Please drop a valid PDF file.");
        }
    };

    const handleUpload = (event) => {
        event.preventDefault();
        console.log(matricule)
        if (lettreMotiv) {
            const token = localStorage.getItem('token');
            const formdata = new FormData();
            formdata.append("lettre_motivation", lettreMotiv);

            const requestOptions = {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true,
                body: formdata,
                redirect: "follow",
            };

            fetch(
                `http://localhost:8081/api/v1/student/postuler?matricule=${matricule}&idOffre=${id}&fileName=${fileName}`,
                requestOptions
            )
                .then(() => {
                    setLettreMotiv(null);
                    setFileName("");
                    setError(null);
                    close(false)
                    window.location.reload()
                })
                .catch((error) => console.log("error", error));
        } else {
            setError("Please select a valid PDF file before uploading.");
        }
    };

    const handleCancel = () => {
        setLettreMotiv(null);
        setFileName("");
        setError(null);
    };

    const handleFileSelect = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setLettreMotiv(selectedFile);
            setFileName(selectedFile.name);
            setError(null);
        } else {
            setLettreMotiv(null);
            setFileName("");
            setError("Please select a valid PDF file.");
        }
    };

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center mt-5"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className="border border-1 border-dark p-5 text-center file-uploader">
                <BiSolidCloudUpload className="upload-icon" />
                <h3 className="mt-4">Glissez la lettre de motivation en fichier PDF ici</h3>
                <span style={{ fontWeight: "bold" }}>Ou</span>
                <br />
                {lettreMotiv ? (
                    <>
                        {fileName && <div className="mt-3">Selected file: {fileName}</div>}
                        {error && <div className="text-danger mt-3">{error}</div>}
                        <button
                            onClick={handleUpload}
                            className="btn btn-primary mt-3"
                        >
                            Soumettre
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
                            Sélectionner la lettre de motivation en fichier PDF
                        </label>
                    </>
                )}
            </div>
        </div>
    );
}

export default CandidatureForm;

import React from "react";
import "./Modal.css";

function Modal({ cv, fileName, onClose }) {

    return (
        <div className="modalBackground">
            <div className="modalContainer w-75 h-100">
                <button className="closeButton" onClick={onClose}>
                    X
                </button>
                <div className="fileName">{fileName}</div>
                <div className="pdfContainer h-100 p-3">
                    <iframe
                        title="PDF Viewer"
                        src={`data:application/pdf;base64,${cv}`}
                        width="100%"
                        height="100%"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Modal;

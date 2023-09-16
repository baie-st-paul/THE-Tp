import React, { useState }  from "react";
import {BiSolidCloudUpload} from "react-icons/bi";
function FileUploader(){
    const [file,setFile] = useState()
    const [fileName, setFileName] = useState("");

    function handleFile(event){
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
        console.log(fileName)
    }

    function handleUpload() {
        const formdata = new FormData();
        formdata.append("file_cv", file);

        const requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8081/api/v1/stages/saveCV?matricule=1966156&fileName="+fileName+"&status=In_review", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="border  border-1 border-black w-50 m-5">
                    <div className="m-1 text-center">
                        <BiSolidCloudUpload style={{ fontSize: '200px',color: "cadetblue" }}></BiSolidCloudUpload>
                        <h3>Drag and drop files here</h3>
                        <span style={{fontWeight: "bold"}}>or</span>
                        <form onSubmit={handleUpload}>
                            <input type="file" name="file" onChange={handleFile} />
                            <button type="submit" className="btn" style={{color: "white",backgroundColor: "cadetblue", fontWeight: "bold"}}>Envoyer CV</button>
                        </form>
                    </div>
            </div>
        </div>
    )
}

export default FileUploader

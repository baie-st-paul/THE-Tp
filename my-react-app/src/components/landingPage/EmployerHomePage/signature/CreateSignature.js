import SignatureCanvas from "react-signature-canvas";
import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import {FaRepeat} from "react-icons/fa6";

const CreateSignature = ({employerId}) => {
    const [sign, setSign] = useState(null)
    const [urlImage, setUrlImage] = useState(null)

    const handleClear = () => {
        sign.clear()
    }
    const handleDelete = () => {
        sign.clear()
        deleteSignature()
    }
    const deleteSignature = async () => {
        try {
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/employers/${employerId}`,
                {
                    method: 'DELETE'
                }
            ).catch(error => {
                console.log(error)
                console.error("Failed to delete signature");
            }).then(
                async (res) => {
                    try {
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setUrlImage(null);
                })
        } catch (error) {
            console.error("Error deleting signature:", error);
        }
    }

    const handleSave = () => {
        setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png'))
    }

    const handleModif = () => {
        setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png'))
    }

    console.log("sign",sign)
    console.log("urlImage",urlImage)

    return (
        <div>
            <h1 className="display-4 text-center">Signature</h1>
            <div style={{border: "2px solid black"}}>
                <SignatureCanvas
                    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                    ref={data=>setSign(data)}
                />

                <Button className="btn btn-danger"
                        onClick={handleClear}>
                    Effacer <FaTimes
                    style={{color: 'black'}}
                />
                </Button>
                {urlImage === null ?
                    <Button className="btn btn-success"
                            onClick={handleSave}>
                        Créer <FaPencilAlt
                        style={{color: 'black'}}
                    />
                    </Button> :
                    <Button className="btn btn-success disabled">
                        Créer <FaPencilAlt
                        style={{color: 'black'}}
                    />
                    </Button>
                }
                {urlImage === null ?
                    <Button className="btn btn-primary disabled">
                        Modifier <FaRepeat
                        style={{color: 'black'}}
                    />
                    </Button> :
                    <Button className="btn btn-primary"
                            onClick={handleModif}>
                        Modifier <FaRepeat
                        style={{color: 'black'}}
                    />
                    </Button>
                }

                <br/>
                {urlImage !== null &&
                    <img src={urlImage} alt="signature"/>
                }
                <br/>
                {urlImage !== null &&
                    <Button className="btn btn-danger"
                            onClick={handleDelete}>
                        Supprimer <FaTimes
                        style={{color: 'black'}}
                    />
                    </Button>
                }
            </div>
        </div>
    )
}

export default CreateSignature

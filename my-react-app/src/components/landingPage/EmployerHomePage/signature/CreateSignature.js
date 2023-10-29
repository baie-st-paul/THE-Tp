import SignatureCanvas from "react-signature-canvas";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import {FaRepeat} from "react-icons/fa6";

const CreateSignature = ({employerId}) => {
    const [sign, setSign] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    const [signature, setSignature] = useState(null)

    useEffect(() => {
        fetch(
            'http://localhost:8081/api/v1/stages/signatures/employers',
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                }
            }
        ).catch(error => {
            console.log(error)
        }).then(
            async (res) => {
                const data = await res.json()
                try {
                    console.log(res.status)
                    if (res.status === 400) {
                        console.log(res.status)
                    }
                } catch (e) {
                    console.log(e)
                }
                console.log(data.length)
                console.log(data.map((dataS) => dataS))
                if(data.length === 0) {
                    setSignature(null)
                } else {
                    setSignature(
                        data.map((dataS) => dataS
                        ));
                }
            })
    }, []);

    const saveSignature = async () => {
        try {
            console.log(urlImage.type)
            const imageLink = urlImage.toString()
            const signature = ({
                employerId,
                imageLink
            })
            console.log(JSON.stringify(signature))

            await fetch(
                'http://localhost:8081/api/v1/stages/signatures/employers/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(signature)
                }
            ).catch((err) => {
                console.log(err)
            }).then(
                (res) => {
                    const data= res.json()
                    try{
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setSignature(data)
                    console.log(data)
                    console.log(signature.imageLink === urlImage)
                    console.log("1",signature.imageLink)
                    console.log("2",urlImage)
                }
            )
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
    }

    const handleModif = async () => {
        try {
            signature["imageLink"] = urlImage
            signature["employerId"] = employerId
            console.log(signature["imageLink"])
            console.log(signature["employerId"])
            console.log(JSON.stringify(signature))

            await fetch(
                `http://localhost:8081/api/v1/stages/signatures/employers`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(signature)
                }
            ).catch((err) => {
                console.log(err)
            }).then(
                (res) => {
                    const data= res.json()
                    try{
                        console.log(res.status)
                        if (res.status === 400) {
                            console.log(res.status)
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setSignature(
                        {...signature, imageLink: data.imageLink}
                    )
                    console.log(data)
                }
            )
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
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
                    setSignature(null)
                })
        } catch (error) {
            console.error("Error deleting signature:", error);
        }
    }

    const handleClear = () => {
        sign.clear()
    }
    const handleDelete = () => {
        sign.clear()
        deleteSignature()
    }

    const handleSave = () => {
        setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png'))
    }

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
                <Button className="btn btn-success"
                        onClick = {handleSave}>
                    Créer <FaPencilAlt
                    style={{color: 'black'}}
                />
                </Button>

                <br/>
                {urlImage !== null &&
                    <img src={urlImage} alt="urlImage"/>
                }
                <br/>

                {signature !== null &&
                    <Button className="btn btn-danger"
                            onClick={handleDelete}>
                        Supprimer <FaTimes
                        style={{color: 'black'}}
                    />
                    </Button>
                }
                {signature === null &&
                    <Button className="btn btn-success"
                            onClick={saveSignature}>
                        Approuver <FaPencilAlt
                        style={{color: 'black'}}
                    />
                    </Button>
                }
                {signature !== null &&
                    <Button className="btn btn-primary"
                            onClick={handleModif}>
                        Modifier <FaRepeat
                        style={{color: 'black'}}
                    />
                    </Button>
                }
            </div>
        </div>
    )
}

export default CreateSignature

import SignatureCanvas from "react-signature-canvas";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import {FaRepeat} from "react-icons/fa6";

const CreateSignature = ({employerId}) => {
    const [sign, setSign] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    const [signature, setSignature] = useState(null)
    const [disableWhenEmpty, setDisableWhenEmpty] = useState(false)

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(
            'http://localhost:8081/api/v1/stages/signatures/employers',
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                withCredentials: true
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
                data.map((dataS) => console.log(dataS))
                if(data.length === 0) {
                    setSignature(null)
                } else {
                    data.map((dataS) => setSignature(dataS)
                    )
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
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
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
                    console.log(data.imageLink === urlImage)
                    console.log("1",data.imageLink)
                    console.log("2",urlImage)
                }
            )
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
        window.location.reload()
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
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
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
        window.location.reload()
    }

    const deleteSignature = async () => {
        try {
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/employers/${employerId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true
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
        window.location.reload()
    }

    const handleClear = () => {
        sign.clear()
        setDisableWhenEmpty(true)
        console.log(sign.empty)
        console.log(disableWhenEmpty)
    }

    const handleDelete = () => {
        sign.clear()
        setDisableWhenEmpty(true)
        deleteSignature()
    }

    const handleSave = () => {
        setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png'))
    }

    return (
        <div>
            <h1 className="display-4 text-center">Signature</h1>
            <div style={{border: "2px solid black"}}>
                <p>Dessiner la signature ici</p>
                <SignatureCanvas
                    canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                    ref={data => setSign(data)}
                    onEnd={() => setDisableWhenEmpty(true)}
                />
            </div>
            <Button className="btn btn-danger"
                    disabled={!disableWhenEmpty}
                    onClick={handleClear}>
                Effacer <FaTimes
                style={{color: 'black'}}
            />
            </Button>
            <Button className="btn btn-success"
                    disabled={!disableWhenEmpty}
                    onClick = {handleSave}>
                Dessiner <FaPencilAlt
                style={{color: 'black'}}
            />
            </Button>

            <br/>
            {signature !== null && urlImage === null &&
                <img src={signature.imageLink} alt="imageLink"/>
            }
            <br/>

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
            {signature === null && urlImage !== null &&
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
    )
}

export default CreateSignature

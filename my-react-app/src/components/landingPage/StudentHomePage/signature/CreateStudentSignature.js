import SignatureCanvas from "react-signature-canvas";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import {FaRepeat} from "react-icons/fa6";

const CreateStudentSignature = ({matricule}) => {
    const [sign, setSign] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    const [signature, setSignature] = useState(null)

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSignature = async () => {
            try {
                const response = await fetch(`http://localhost:8081/api/v1/stages/signatures/students/${localStorage.getItem("loggedInUserMatricule")}`);
                console.log(token)
                if (response.ok) {
                    const data = await response.json();
                    setSignature(data);
                } else {
                    console.error("Failed to fetch data");
                    setSignature(null)
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchSignature()
    }, [setSignature]);

    const saveSignature = async () => {
        try {
            console.log(urlImage.type)
            const imageLink = urlImage.toString()
            let studentMatricule = localStorage.getItem("loggedInUserMatricule")
            const signature = ({
                studentMatricule,
                imageLink
            })
            console.log(token)
            console.log(JSON.stringify(signature))

            await fetch(
                'http://localhost:8081/api/v1/stages/signatures/students/create',
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
            const imageLink = urlImage.toString()
            let studentMatricule = localStorage.getItem("loggedInUserMatricule")
            const signature = ({
                studentMatricule,
                imageLink
            })
            await fetch(
                `http://localhost:8081/api/v1/stages/signatures/students`,
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
                    const data = res.json()
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
            let studentMatricule = localStorage.getItem("loggedInUserMatricule")
            fetch(
                `http://localhost:8081/api/v1/stages/signatures/students/${studentMatricule}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    withCredentials: true,
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
                {signature === null && urlImage !== null ?
                    <Button className="btn btn-success"
                            onClick={saveSignature}>
                        Approuver <FaPencilAlt
                        style={{color: 'black'}}
                    />
                    </Button> :
                    <Button className="btn btn-success disabled">
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

export default CreateStudentSignature

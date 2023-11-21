import SignatureCanvas from "react-signature-canvas";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTimes} from "react-icons/fa";
import {FaRepeat} from "react-icons/fa6";
import FetchsEmployer from "../../NavBar/employer/FetchsEmployer";
import NavBarEmployeur from "../../NavBar/employer/NavBarEmployeur";

const CreateSignature = () => {
    const [sign, setSign] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    const [signature, setSignature] = useState(null)
    const [disableWhenEmpty, setDisableWhenEmpty] = useState(false)
    const [disableModifier, setDisableModifier] = useState(true)
    let employerId = localStorage.getItem('employer_id')
    const token = localStorage.getItem('token');

    useEffect(() => {
        getFetchs()
    }, []);

    const getFetchs = async () => {
        setSignature(FetchsEmployer.fetchSignature(token, employerId, signature, setSignature))
    }

    const saveSignature = async () => {
        try {
            const imageLink = urlImage.toString()
            const signature = ({
                employerId,
                imageLink
            })
            console.log(JSON.stringify(signature))

            await fetch(
                'http://localhost:8081/api/v1/stages/signatures/employer/create',
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
                `http://localhost:8081/api/v1/stages/signatures/employer/update`,
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

    const handleClear = () => {
        sign.clear()
        setDisableWhenEmpty(false)
        setDisableModifier(true)
        setUrlImage(null)
        console.log(sign.empty)
    }

    const handleSave = () => {
        console.log(sign.empty)
        if (signature !== null ) 
        setDisableModifier(false)
        setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png'))
    }
    return (
        <div>
            <NavBarEmployeur/>
            <div id="Render" className="container content-container mt-4">
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
                        onClick={handleSave}>
                    Confirmer <FaPencilAlt
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

                {signature === null && urlImage !== null &&
                    <Button className="btn btn-success"
                            onClick={saveSignature}>
                        Sauvegarder <FaPencilAlt
                        style={{color: 'black'}}
                    />
                    </Button>
                }
                {signature !== null &&
                    <Button className="btn btn-primary"
                            onClick={handleModif}
                            disabled={disableModifier}>
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

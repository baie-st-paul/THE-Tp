import SignatureCanvas from "react-signature-canvas";
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FaPencilAlt, FaTimes, FaTrash} from "react-icons/fa";
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
            const imageLink = sign.getTrimmedCanvas().toDataURL('image/png')
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
                    setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png').toString())
                    console.log(data)
                }
            )
        } catch (error) {
            console.log('Une erreur est survenue:', error);
        }
        window.location.reload()
    }


    function handleSave() {
        saveSignature()

    }

    const handleModif = async () => {
        try {
            signature["imageLink"] = sign.getTrimmedCanvas().toDataURL('image/png').toString()
            setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png').toString())
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
                        signature
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


    return (
        <div>
            <NavBarEmployeur/>
            <div id="Render" className="container content-container mt-4">
                <h1 className="display-4 text-center">Signature</h1>
                <div style={{border: "2px solid black"}}>
                    <div className="">
                        <span className="text-center "> Dessiner la signature ici</span>
                        <Button style={{position: 'relative', backgroundColor: 'transparent' }} className="btn float-end m-0"
                                disabled={!disableWhenEmpty}
                                onClick={handleClear}>
                            <FaTrash
                                style={{color: 'black'}}/>
                        </Button>
                    </div>
                    <SignatureCanvas
                        canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                        ref={data => setSign(data)}
                        onBegin={ ()=> setDisableModifier(false)}
                        onEnd={() => setDisableWhenEmpty(true)}
                    />
                </div>


                {signature !== null && urlImage === null ?
                    <div>
                        <br></br>
                        <img src={signature.imageLink} alt="imageLink"/>
                    </div> : <p></p>
                }

                {urlImage !== null ?
                    <div>
                        <br></br>
                        <img src={urlImage} alt="urlImage"/> </div>:
                    <p></p>}

                {signature !== null ? (
                    <Button className="btn btn-primary"
                            onClick={handleModif}
                            disabled={disableModifier}
                    >
                        Modifier <FaRepeat
                        style={{color: 'black'}}
                    />
                    </Button>
                ) : <Button className="btn btn-success"
                            disabled={!disableWhenEmpty}
                            onClick={handleSave}>
                    Sauvegarder <FaPencilAlt
                    style={{color: 'black'}}
                />
                </Button>
                }
            </div>
        </div>
    )
}

export default CreateSignature

import SignatureCanvas from "react-signature-canvas";
import {useState} from "react";

const CreateSignature = () => {
    const [sign, setSign] = useState(null)
    const [urlImage, setUrlImage] = useState(null)

    const handleClear = () => {
        sign.clear()
    }

    const handleSave = () => {
        setUrlImage(sign.getTrimmedCanvas().toDataURL('image/png'))
    }

    const handleModif = () => {

    }

    console.log(sign)
    console.log(urlImage)

    return (
        <div style={{border: "2px solid black", width: 500, height: 200}}>
            <SignatureCanvas
                canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
                ref={data=>setSign(data)}
            />
            <button onClick={handleClear}>Effacer</button>
            <button onClick={handleSave}>Créer</button>
            <button onClick={handleModif}>Modifier</button>

            <img src={urlImage} alt="signature"/>
        </div>
    )
}

export default CreateSignature

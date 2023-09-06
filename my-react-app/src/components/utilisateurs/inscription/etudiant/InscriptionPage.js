import React, {useState} from 'react';
import InscriptionForm from "./InscriptionForm";
import "./InscriptionPage.css"
import Header from "./Header";

const InscriptionPage = () => {
    return (
        <div>
            <Header/>
            {<InscriptionForm />}
        </div>
    )
}

export default InscriptionPage

import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import InscriptionPage from "./components/utilisateurs/inscription/etudiant/InscriptionPage";
import UtilisateursMain from './components/utilisateurs/mainPage/utilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import FileUploader from "./components/cv/FileUploader";

function App() {
  return (
      <div>
        <Routes>
            <Route path="/etudiant" element={<InscriptionPage/>} />
            <Route path="/" element={<UtilisateursMain/>} />
            <Route path="/saveCv" element={<FileUploader/>} />
        </Routes>
      </div>
  )
}

export default App;

import './App.css';
import UtilisateursMain from './components/utilisateurs/utilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import InscriptionPage from "./components/utilisateurs/inscription/etudiant/InscriptionPage";
import 'bootstrap/dist/css/bootstrap.css';
import FileUploader from "./components/cv/FileUploader";
import PageNotFound from "./components/PageNotFound";
import ConnexionPage from "./components/utilisateurs/login/pages/ConnexionPage";
import LandingPage from "./components/landingPage/LandingPage";
import {isConnected} from "./components/utilisateurs/login/pages/ConnexionPage"

function App() {
  return (
      <div>
        <Routes>
            <Route
                path="/"
                element={
                isConnected() ?
                    <Navigate to="/landingPage"/> :
                    <Navigate to="/connexionMain"/>
                    }
            />
            <Route path="*" element={<PageNotFound/>} />
            <Route path="/etudiantInscription" element={<InscriptionPage/>} />
            <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />
            <Route path="/saveCv" element={<FileUploader/>} />
            <Route path="/connexionMain" element={<UtilisateursMain/>}/>
            <Route path="/landingPage" element={<LandingPage/>}/>
        </Routes>
      </div>
  )
}

export default App;

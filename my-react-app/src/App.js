import './App.css';
import UtilisateursMain from './components/utilisateurs/utilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import InscriptionPageE from "./components/utilisateurs/inscription/etudiant/InscriptionPageE";
import InscriptionPageEmp from "./components/utilisateurs/inscription/employeur/InscriptionPageEmp";
import InscriptionPageG from "./components/utilisateurs/inscription/gestionnaire/InscriptionPageG";
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
                !isConnected() ?
                    <Navigate to="/connexionMain"/> :
                    <Navigate to="/landingPage"/>
                    }
            />
            <Route path="*" element={<PageNotFound/>} />
            <Route path="/etudiantInscription" element={<InscriptionPageE/>} />
            <Route path="/employeurInscription" element={<InscriptionPageEmp/>} />
            <Route path="/gestionnaireInscription" element={<InscriptionPageG/>} />
            <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />
            <Route path="/saveCv" element={<FileUploader/>} />
            <Route path="/connexionMain" element={<UtilisateursMain/>}/>
            <Route path="/landingPage" element={<LandingPage/>}/>
        </Routes>
      </div>
  )
}

export default App;

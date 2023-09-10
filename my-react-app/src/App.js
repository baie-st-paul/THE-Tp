import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import InscriptionPage from "./components/utilisateurs/inscription/etudiant/InscriptionPage";
import UtilisateursMain from './components/utilisateurs/mainPage/utilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import PageNotFound from "./components/PageNotFound";
import ConnexionPage from "./components/utilisateurs/login/etudiant/ConnexionPage";

function App() {
  return (
      <div>
        <Routes>
            <Route path="*" element={<PageNotFound/>} />
            <Route path="/etudiantInscription" element={<InscriptionPage/>} />
            <Route path="/etudiantConnexion" element={<ConnexionPage/>} />
            <Route path="/" element={<UtilisateursMain/>} />
        </Routes>
      </div>
  )
}

export default App;

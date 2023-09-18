import './App.css';
import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import React from "react";
import InscriptionPageE from "./components/utilisateurs/inscription/etudiant/InscriptionPageE";
import InscriptionPageEmp from "./components/utilisateurs/inscription/employeur/InscriptionPageEmp";
import InscriptionPageG from "./components/utilisateurs/inscription/gestionnaire/InscriptionPageG";
import UtilisateursMain from './components/utilisateurs/mainPage/utilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import FileUploader from "./components/cv/FileUploader";
import PageNotFound from "./components/PageNotFound";
import { useUser } from "./Providers/UserProvider";
import StudentPrivateRoutes from "./utils/StudentPrivateRoutes";
import GestionnairePrivateRoutes from "./utils/GestionnairePrivateRoutes";

function App() {
    let loggedInUser = useUser();
    return (
            <div>
                <Routes>
                    <Route path={"/StudentHomePage"} element={<StudentPrivateRoutes/>}/>
                    <Route path={"/Gestionnaire"} element={<GestionnairePrivateRoutes/>}/>
                    <Route path="/connexionMain" element={<ConnexionPage/>} />
                    <Route path="*" element={<PageNotFound/>}/>
                    <Route path="/" element={<UtilisateursMain/>}/>
                    <Route path="/connexionMain" element={<UtilisateursMain/>} />
                    <Route path="/etudiantInscription" element={<InscriptionPageE/>} />
                    <Route path="/employeurInscription" element={<InscriptionPageEmp/>} />
                    <Route path="/gestionnaireInscription" element={<InscriptionPageG/>} />
                    <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />
                    <Route path="/saveCv" element={<FileUploader/>}/>
                </Routes>
            </div>
    )
}

export default App;

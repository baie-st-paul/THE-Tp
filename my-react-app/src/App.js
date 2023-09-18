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
import ConnexionPage, {isConnected, renderHomePage} from "./components/utilisateurs/login/pages/ConnexionPage";
import { useUser } from "./Providers/UserProvider";
import StudentHomePage from "./components/landingPage/StudentHomePage";
import EmployeurHomePage from "./components/landingPage/EmployeurHomePage";
import GestionnaireHomePage from "./components/landingPage/GestionnaireHomePage";
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
                    <Route path="*" element={<PageNotFound/>} />
                    <Route path="/etudiantInscription" element={<InscriptionPageE/>} />
                    <Route path="/employeurInscription" element={<InscriptionPageEmp/>} />
                    <Route path="/gestionnaireInscription" element={<InscriptionPageG/>} />
                    <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />
                    <Route path="/saveCv" element={<FileUploader/>} />
                    <Route path="/" element={<UtilisateursMain/>}/>>
                </Routes>
            </div>
    )
}

export default App;

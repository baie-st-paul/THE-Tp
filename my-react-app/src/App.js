import './App.css';
import UtilisateursMain from './components/utilisateurs/utilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import InscriptionPageE from "./components/utilisateurs/inscription/etudiant/InscriptionPageE";
import InscriptionPageEmp from "./components/utilisateurs/inscription/employeur/InscriptionPageEmp";
import InscriptionPageG from "./components/utilisateurs/inscription/gestionnaire/InscriptionPageG";
import 'bootstrap/dist/css/bootstrap.css';
import FileUploader from "./components/cv/FileUploader";
import PageNotFound from "./components/PageNotFound";
import ConnexionPage from "./components/utilisateurs/login/pages/ConnexionPage";
import { useUser } from "./Providers/UserProvider";
import StudentPrivateRoutes from "./utils/StudentPrivateRoutes";
import GestionnairePrivateRoutes from "./utils/GestionnairePrivateRoutes";
import EmployeurPrivateRoutes from "./utils/EmployeurPrivateRoutes";

//<Route path="/connexionMain" element={<ConnexionPage/>} /> fait des erreur de redirection pour le retour dans les forms

function App() {
    let loggedInUser = useUser();
    return (
            <div>
                <Routes>
                    <Route path="/" element={<UtilisateursMain/>}/>
                    <Route path="/connexionMain" element={<UtilisateursMain/>} />
                    <Route path={"/StudentHomePage"} element={<StudentPrivateRoutes/>}/>
                    <Route path={"/GestionnaireHomePage"} element={<GestionnairePrivateRoutes/>}/>
                    <Route path={"/EmployeurHomePage"} element={<EmployeurPrivateRoutes/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                    <Route path="/" element={<UtilisateursMain/>}/>
                    <Route path="/etudiantInscription" element={<InscriptionPageE/>} />
                    <Route path="/employeurInscription" element={<InscriptionPageEmp/>} />
                    <Route path="/gestionnaireInscription" element={<InscriptionPageG/>} />
                    <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />

                    <Route path="/saveCv" element={<FileUploader/>} />
                    <Route path="*" element={<PageNotFound/>} />
                </Routes>
            </div>
    )
}

export default App;

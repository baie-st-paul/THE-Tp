import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
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
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
    return (
            <div>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path="/StudentHomePage" element={<StudentHomePage/>}/>
                        <Route path="/EmployeurHomePage" element={<EmployeurHomePage/>}/>
                        <Route path="/GestionnaireHomePage" element={<GestionnaireHomePage/>}/>
                    </Route>

                    <Route path="*" element={<PageNotFound/>} />
                    <Route path="/" element={<UtilisateursMain/>}/>
                    <Route path="/connexionMain" element={<UtilisateursMain/>} />

                    <Route path="/etudiantInscription" element={<InscriptionPageE/>} />
                    <Route path="/employeurInscription" element={<InscriptionPageEmp/>} />
                    <Route path="/gestionnaireInscription" element={<InscriptionPageG/>} />
                    <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />

                    <Route path="/saveCv" element={<FileUploader/>} />
                </Routes>
            </div>
    )
}

export default App;

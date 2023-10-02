import './App.css';
import {Routes, Route, Navigate, Outlet} from "react-router-dom";
import React from "react";
import InscriptionPageE from "./components/utilisateurs/inscription/etudiant/InscriptionPageE";
import InscriptionPageEmp from "./components/utilisateurs/inscription/employeur/InscriptionPageEmp";
import InscriptionPageG from "./components/utilisateurs/inscription/gestionnaire/InscriptionPageG";
import UtilisateursMain from './components/utilisateurs/mainPage/utilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import FileUploader from "./components/cv/FileUploader";
import PageNotFound from "./page_not_found/PageNotFound";
import { useUser } from "./Providers/UserProvider";
import StudentPrivateRoutes from "./utils/StudentPrivateRoutes";
import ConnexionPage from "./components/utilisateurs/login/pages/ConnexionPage";
import EmployeurPrivateRoutes from "./utils/EmployerPrivateRoutes";
import OffresPage from "./components/landingPage/offresStages/OffrePage";
import AjoutOffreForm from './components/landingPage/EmployerHomePage/ajoutOffreForm';
import GestionnairePrivateRoutes from "./utils/GestionnairePrivateRotes";


function App() {
    let loggedInUser = useUser();
    return (
        <div>
            <Routes>
                <Route path={"/addJobOffer"} element={<AjoutOffreForm/>}></Route>
                <Route path={"/StudentHomePage"} element={<StudentPrivateRoutes/>}/>
                <Route path={"/GestionnaireHomePage"} element={<GestionnairePrivateRoutes/>}/>
                <Route path={"/EmployeurHomePage"} element={<EmployeurPrivateRoutes/>}/>
                <Route path="/offresGestionnaire" element={<OffresPage/>} />
                <Route path="/veto-section" component={<GestionnairePrivateRoutes/>}/>
                <Route path="/offre-page" component={<GestionnairePrivateRoutes/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/" element={<UtilisateursMain/>}/>
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
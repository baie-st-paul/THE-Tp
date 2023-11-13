import './App.css';
import {Routes, Route} from "react-router-dom";
import React from "react";
import InscriptionPageE from "./components/utilisateurs/inscription/etudiant/InscriptionPageE";
import InscriptionPageEmp from "./components/utilisateurs/inscription/employeur/InscriptionPageEmp";
import UtilisateursMain from './components/utilisateurs/mainPage/UtilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import FileUploader from "./components/cv/FileUploader";
import PageNotFound from "./page_not_found/PageNotFound";
import StudentPrivateRoutes from "./utils/StudentPrivateRoutes";
import ConnexionPage from "./components/utilisateurs/login/pages/ConnexionPage";
import EmployeurPrivateRoutes from "./utils/EmployerPrivateRoutes";
import AjoutOffreForm from './components/landingPage/EmployerHomePage/offres/offre/AjoutOffreForm';
import GestionnairePrivateRoutes from "./utils/GestionnairePrivateRoutes";
import OffresPageGestionnaire from "./components/landingPage/GestionnaireHomePage/offreGestionnaire/OffrePageGestionnaire";
import OffresPageStudent from "./components/landingPage/StudentHomePage/candidature/OffrePageStudent";
import InformationEtudiantPostule from './components/landingPage/EmployerHomePage/offres/offre/infoStudentOffre/InformationEtudiantPostule';

function App() {
    return (
        <div>
            <Routes>
                <Route path={"/infoStudent"} element={<InformationEtudiantPostule/>}></Route>
                <Route path={"/addJobOffer"} element={<AjoutOffreForm/>}></Route>
                <Route path={"/StudentHomePage"} element={<StudentPrivateRoutes/>}/>
                <Route path={"/GestionnaireHomePage"} element={<GestionnairePrivateRoutes/>}/>
                <Route path={"/EmployeurHomePage"} element={<EmployeurPrivateRoutes/>}/>
                <Route path="/offresGestionnaire" element={<OffresPageGestionnaire/>} />
                <Route path="/offresStudent" element={<OffresPageStudent/>} />
                <Route path="/veto-section" component={<GestionnairePrivateRoutes/>}/>
                <Route path="/offre-page" component={<GestionnairePrivateRoutes/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/" element={<UtilisateursMain/>}/>
                <Route path="/etudiantInscription" element={<InscriptionPageE/>} />
                <Route path="/employeurInscription" element={<InscriptionPageEmp/>} />
                <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />
                <Route path="/saveCv" element={<FileUploader/>}/>
            </Routes>
        </div>
    )
}

export default App;

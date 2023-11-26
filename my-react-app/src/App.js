import './App.css';
import {Routes, Route} from "react-router-dom";
import React from "react";
import InscriptionPageE from "./components/utilisateurs/inscription/etudiant/InscriptionPageE";
import InscriptionPageEmp from "./components/utilisateurs/inscription/employeur/InscriptionPageEmp";
import UtilisateursMain from './components/utilisateurs/mainPage/UtilisateursMain';
import 'bootstrap/dist/css/bootstrap.css';
import PageNotFound from "./page_not_found/PageNotFound";
import StudentPrivateRoutes from "./utils/StudentPrivateRoutes";
import FileUploader from "./components/cv/FileUploader"
import ConnexionPage from "./components/utilisateurs/login/pages/ConnexionPage";
import EmployeurPrivateRoutes from "./utils/EmployerPrivateRoutes";
import AjoutOffreForm from './components/landingPage/EmployerHomePage/offres/offre/ajout/AjoutOffreForm';
import GestionnairePrivateRoutes from "./utils/GestionnairePrivateRoutes";
import OffresPageGestionnaire from "./components/landingPage/GestionnaireHomePage/offreGestionnaire/OffrePageGestionnaire";
import OffresPageStudent from "./components/landingPage/StudentHomePage/candidature/OffrePageStudent";
import InformationEtudiantPostule from './components/landingPage/EmployerHomePage/candidature/infoStudentOffre/InformationEtudiantPostule';
import VetoSection from "./components/landingPage/GestionnaireHomePage/Vetocv/VetoSection";
import EtudiantsConvoquesEntrevue
    from "./components/landingPage/GestionnaireHomePage/entrevue/EtudiantsConvoquesEntrevue";
import EtudiantEmbauchePage from "./components/landingPage/GestionnaireHomePage/embauche/EtudiantEmbauchePage";
import ListContratsGestionnaire from "./components/landingPage/GestionnaireHomePage/contrat/ListContratsGestionnaire";
import EmployerStageOffreList from "./components/landingPage/EmployerHomePage/offres/EmployerStageOffreList";
import CreateSignature from "./components/landingPage/EmployerHomePage/signature/CreateSignature";
import EmployeurMesContrats from "./components/landingPage/EmployerHomePage/contrat/EmployeurMesContrats";
import FetchsEmployer from "./components/landingPage/NavBar/employer/FetchsEmployer";
import CreateStudentSignature from "./components/landingPage/StudentHomePage/signature/CreateStudentSignature";
import OffreCandidaturePage from "./components/landingPage/StudentHomePage/candidature/OffreCandidaturePage";
import SectionEntrevue from "./components/landingPage/StudentHomePage/SectionViewEntrevue/SectionEntrevue";
import EtudiantMesContrats from "./components/landingPage/StudentHomePage/contrat/EtudiantMesContrats";
import Candidatures from './components/landingPage/EmployerHomePage/candidature/candidatures';
import CreateSignatureGes from "./components/landingPage/GestionnaireHomePage/signature/CreateSignatureGes";

function App() {
    return (
        <div>
            <Routes>
                
                <Route path={"/StudentHomePage"} element={<StudentPrivateRoutes/>}/>
                <Route path={"/cvEtudiant"} element={<FileUploader matricule={localStorage.getItem("loggedInUserMatricule")}/>}/>
                <Route path={"/signatureEtudiant"} element={<CreateStudentSignature/>}/>
                <Route path={"/offresEtudiant"} element={<OffresPageStudent/>}/>
                <Route path={"/entrevuesEtudiant"} element={<SectionEntrevue entrevueTest={[]}/>}/>
                <Route path={"/candidaturesEtudiant"} element={<OffreCandidaturePage/>}/>
                <Route path={"/contratsEtudiant"} element={<EtudiantMesContrats contratsTest={[]}/>}/>

                <Route path={"/GestionnaireHomePage"} element={<GestionnairePrivateRoutes/>}/>
                <Route path={"/signatureGes"} element={<CreateSignatureGes/>}/>
                <Route path={"/CV-veto"} element={<VetoSection/>}/>
                <Route path={"/Offres-veto"} element={<OffresPageGestionnaire/>}/>
                <Route path={"/entrevues"} element={<EtudiantsConvoquesEntrevue/>}/>
                <Route path={"/embauchés"} element={<EtudiantEmbauchePage contratsTest={[]} candidaturesTest={[]}/>}/>
                <Route path={"/contrats"} element={<ListContratsGestionnaire contratsTest={[]}/>}/>

                <Route path={"/EmployeurHomePage"} element={<EmployeurPrivateRoutes/>}/>
                <Route path={"/signature"} element={<CreateSignature/>}/>
                <Route path={"/offres"} element={<EmployerStageOffreList/>}/>
                <Route path={"/ajoutOffre"} element={<AjoutOffreForm onAdd={FetchsEmployer.ajoutOffre}/>}/>
                <Route path={"/contrats-emp"} element={<EmployeurMesContrats contratsTest={[]}/>}/>
                <Route path={"/infoStudent"} element={<InformationEtudiantPostule/>}/>
                <Route path={"/candidatures"} element={<Candidatures/>}/>

                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/" element={<UtilisateursMain/>}/>

                <Route path="/etudiantInscription" element={<InscriptionPageE/>} />
                <Route path="/employeurInscription" element={<InscriptionPageEmp/>} />
                <Route path="/utilisateurConnexion" element={<ConnexionPage/>} />
            </Routes>
        </div>
    )
}

export default App;

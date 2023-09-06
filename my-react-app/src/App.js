import './App.css';
import {Route, Routes} from "react-router-dom";
import React from "react";
import InscriptionPage from "./components/utilisateurs/inscription/etudiant/InscriptionPage";

function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<InscriptionPage/>} />
        </Routes>
      </div>
  )
}

export default App;

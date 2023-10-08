import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeurHomePage = () => {
  const [offers, setOffers] = useState([]);  
  const [applicants, setApplicants] = useState({});  

   // Charger toutes les offres au montage du composant
   useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/stages/offres');
        setOffers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des offres:', error);
      }
    };

    fetchOffers();
  }, []);

  // Charger les candidats pour une offre donnée
  const fetchApplicants = async (employerId, offerId) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/employers/${employerId}/offers/${offerId}/applicants`);
      setApplicants(prevState => ({
        ...prevState,
        [offerId]: response.data
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des candidats:', error);
    }
  };

  // Affichage des offres et des candidats
  return (
    <div>
      <h1>Mes offres</h1>
      <ul>
        {offers.map((offer, index) => (
          <li key={index}>
            {offer.title} - {offer.applicationsCount} candidatures
            {offer.applicationsCount > 0 && (
              <button onClick={() => fetchApplicants(offer.employerId, offer.id)}>Voir les candidats</button>
            )}
            {applicants[offer.id] && (
              <div>
                <h3>Candidats pour {offer.title}</h3>
                {/* Affichez les détails des candidats ici. Par exemple : */}
                 
                <table>
                  <thead>
                    <tr>
                      <th>Nom et prénom</th>
                      <th>Email</th>
                      <th>Téléphone</th>
                      <th>Lettre de motivation</th>
                      <th>CV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants[offer.id].map((applicant, i) => (
                      <tr key={i}>
                        <td>{applicant.name}</td>
                        <td>{applicant.email}</td>
                        <td>{applicant.phone}</td>
                        <td><a href={applicant.coverLetterUrl}>Voir</a></td>
                        <td><a href={applicant.cvUrl}>Voir</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeurHomePage;

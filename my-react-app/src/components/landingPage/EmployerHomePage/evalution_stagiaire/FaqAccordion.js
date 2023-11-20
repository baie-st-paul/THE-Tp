import React, { useState } from 'react';
import './FaqAccordion.css';

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index, event) => {
    event.preventDefault(); 
    event.stopPropagation(); 
    setActiveIndex(activeIndex === index ? null : index);
  };
  

  return (
    <div className="faq-section">
      <h4>FAQ - Questions Fréquemment Posées</h4>
      <div className="faq-item">
      <button className="faq-question" onClick={(e) => handleToggle(0, e)}>
        Que fait le bouton "Soumettre l'évaluation en PDF" ?
      </button>

        {activeIndex === 0 && (
          <div className="faq-answer">
            <p>Ce bouton permet d'envoyer le formulaire d'évaluation, qui est automatiquement converti en un document PDF, directement à notre serveur pour un traitement ultérieur. Il est utilisé lorsque vous avez terminé de remplir le formulaire et que vous êtes prêt à soumettre l'évaluation complète.</p>
          </div>
        )}
      </div>
      <div className="faq-item">
        <button className="faq-question" onClick={(e) => handleToggle(1, e)}>
          Que fait le bouton "Télécharger l'évaluation en PDF" ?
        </button>
        {activeIndex === 1 && (
          <div className="faq-answer">
            <p>Ce bouton permet de télécharger une copie du formulaire d'évaluation rempli en format PDF sur votre appareil local. Vous pouvez utiliser cette fonction pour conserver une copie de l'évaluation pour vos archives ou pour l'imprimer.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqAccordion;

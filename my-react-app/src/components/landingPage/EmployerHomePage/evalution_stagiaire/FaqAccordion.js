import React, { useState } from 'react';
import './FaqAccordion.css';

const FaqAccordionItem = ({ question, answer, isActive, setActive }) => (
  <div className="faq-item">
    <button
    type='button'
      className={`faq-question ${isActive ? "active" : ""}`}
      onClick={setActive}
    >
      {question}
    </button>
    <div
      className="faq-answer"
      style={{ maxHeight: isActive ? `${answer.length * 0.6}rem` : "0" }}
    >
      {isActive && <p>{answer}</p>}
    </div>
  </div>
);

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index, event) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Que fait le bouton \"Soumettre l'évaluation en PDF\" ?",
      answer:
        "Ce bouton permet d'envoyer le formulaire d'évaluation, qui est automatiquement converti en un document PDF, directement à notre serveur pour un traitement ultérieur. Il est utilisé lorsque vous avez terminé de remplir le formulaire et que vous êtes prêt à soumettre l'évaluation complète.",
    },
    {
      question: "Que fait le bouton \"Télécharger l'évaluation en PDF\" ?",
      answer:
        "Ce bouton permet de télécharger une copie du formulaire d'évaluation rempli en format PDF sur votre appareil local. Vous pouvez utiliser cette fonction pour conserver une copie de l'évaluation pour vos archives ou pour l'imprimer.",
    },
  ];

  return (
    <div className="faq-section">
      <h4>FAQ - Questions Fréquemment Posées</h4>
      {faqItems.map((item, index) => (
        <FaqAccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isActive={activeIndex === index}
          setActive={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default FaqAccordion;

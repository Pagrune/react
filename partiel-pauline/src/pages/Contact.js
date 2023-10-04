import React, { useState } from 'react';
import EmailHandler from '../components/EmailHandler';


const Contact = () => {
    const [email, setEmail] = useState('');
    const [demande, setDemande] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch('http://localhost:3001/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, demande })
        });
  
        if (response.ok) {
          console.log('Courriel envoyé avec succès');
          // Réinitialisez les champs du formulaire après l'envoi réussi
        //   setEmail('');
        //   setDemande('');
        } else {
          console.error('Erreur lors de l\'envoi du courriel');
        }
      } catch (error) {
        console.error('Erreur lors de l\'envoi du courriel', error);
      }
    };
  
    return (
        <>
       <div className='container'>
        <div className="App">
            <h1>Formulaire de contact</h1>
            <p>Une question ? Vous êtes au bon endroit</p>
            <EmailHandler/>
          </div>
       </div>
        
    </>
    );
};

export default Contact;
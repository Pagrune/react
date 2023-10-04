import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const EmailHandler = () => {
    const [formData, setFormData] = useState({
        from_name: '',
        to_name: '',
        message: '',
        });
        const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
        };
        const [confirmationMessage, setConfirmationMessage] = useState('');
        
        const handleSubmit = (e) => {
            e.preventDefault();
            emailjs.send(
            'service_q6gurvh',
            'template_361qu5f',
            formData,
            'ZeoJOnlGIczHUVZQu'
            )
            .then((result) => {
            console.log(result.text);
            setConfirmationMessage('Le mail a été envoyé avec succès.');
            setFormData({
                from_name: '',
                to_name: '',
                message: '',
            });
            }, (error) => {
            console.log(error.text);
            setConfirmationMessage('Erreur lors de l\'envoi du mail. Veuillez réessayer.');
            });
            };

    return (
        <div>
            {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
            <form className='form_contact' onSubmit={handleSubmit}>
                <input type="text" name="from_name" value={formData.from_name} onChange={handleInputChange}
                placeholder="Votre nom" required />
                <input type="text" name="to_name" value={formData.to_name} onChange={handleInputChange}
                placeholder="Nom du destinataire" required />
                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Votre message" required />
                <button type="submit">Envoyer le mail</button>
            </form>
        </div>
        );        
};

export default EmailHandler;
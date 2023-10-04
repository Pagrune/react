import React, { useState } from 'react';
import axios from 'axios';
import  { Link, Redirect, useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const history = useHistory();

    const [userAuthenticated, setUserAuthenticated] = useState(localStorage.getItem('token') !== null);

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('https://dummyjson.com/auth/login', {
            username,
            password
        })
        .then(response => {
            // Si l'authentification réussit, stockez les informations d'authentification dans le localStorage
            localStorage.setItem('token', response.data.token);
            // Redirigez l'utilisateur vers la page de commentaire (ou autre page protégée)
            // window.location.reload(); // Rafraîchissez la page pour re-render le composant CommentForm
            // return redirect("/tasks");
            // history.push("/tasks");
            // return <Redirect to='/tasks'  />;
            // if (response.data.token) {
            //     history.push('/tasks');
            //     }
                

        })
        .catch(error => {
            // Gérez les erreurs d'authentification ici
            console.error("Erreur d'authentification :", error);
        });
    };

    return (

        // 

        <div>
        {/* Affichez les détails de l'article en fonction de l'identifiant */}
        {/* <h1>Détails de l'article {id}</h1> */}
        {/* {isLoading ? (
            <p>Chargement en cours...</p>
        ) : ( */}
            <div className='container'>
                               
                {userAuthenticated ? (
                
                    <div className='container'>
                        <h1>Gestion du compte</h1>
                        <p>Vous êtes déjà connecter</p>
                        <Link to={`/tasks`}>lien vers les tâches</Link>
                    </div>
                
                 ) : (
                    <>
                        <div className='connexion'>
                         <h2>Connexion</h2>
                         <form className='form_contact' onSubmit={handleLogin}>
                             <div className="form-group">
                                 <label>Nom d'utilisateur</label>
                                 <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                             <div className="form-group">
                                 <label>Mot de passe</label>
                                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                             </div>
                             <button type="submit">Se connecter</button>
                       </form>
                     </div>
                    </>
                )}
                <div>
            
            </div>
            </div>
        
    </div>
       
        
    );
};

export default Login;
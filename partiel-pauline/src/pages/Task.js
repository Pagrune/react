import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input, InputGroup, InputGroupText, Spinner, Toast, ToastBody, ToastHeader } from 'reactstrap';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const Task = () => {
    const { id } = useParams(); // Accéder aux paramètres d'URL
    const [todos, setTodos] =useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [comments, setComments] =useState([]);
    const [message, setMessage] = useState(
        JSON.parse(localStorage.getItem('commentaires')) || []
    );
    const [isOpen, setOpen] = React.useState(
        JSON.parse(localStorage.getItem('is-open')) || false
    );

    useEffect(()=>{
        axios.get(`https://dummyjson.com/todos/${id}`)
            .then(res => { 
                console.log(res.data);
                setTodos(res.data);
                setIsloading(false);
            })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const commentText = document.querySelector('#id_message').value;

        var token = localStorage.getItem('token');
        // console.log(token);
        var decoded = jwt_decode(token);
        const author_commentText = decoded.firstName;
       

        const newMessages = [...message, { id_comment : id, author: author_commentText, text: commentText }];
        setMessage(newMessages);

        localStorage.setItem('commentaires', JSON.stringify(newMessages));
        setOpen(true);  // Ouvrez la section des nouveaux commentaires ici.

        // document.querySelector('#id_message').value = '';  // Effacez le champ de commentaire après l'envoi.
    };

    

    const deleteById = id => {
        setTodos(oldValues => {
          return oldValues.filter(todo => todo.id !== id)
        })
      }

   

    return (
        <div className='container'>
            <h1>{todos.todo}</h1>
            <InputGroup className='checkbox'>
                <InputGroupText>
                    <Input
                                        addon
                                        aria-label="Checkbox for following text input"
                                        type="checkbox"
                    />
                    </InputGroupText>
                    <Input value="Réalisée" />
            </InputGroup>

            <div>
            <h3>Commentaires :</h3>
                    <div>
                        
                            <div className='affichage_comment'>
                               {message
                                .filter(msg => msg.id_comment === id) 
                                .map((msg, index) => (
                                    <div className='p-3 my-2 rounded' key={index}>                                        
                                        <Toast>
                                        <ToastHeader className='toasthead'>
                                            De : {msg.author}
                                        </ToastHeader>
                                        <ToastBody>
                                            {msg.text}
                                        </ToastBody>
                                            <Button className='btn-supp'>X</Button>
                                        </Toast>

                                    </div>
                                ))}
                            </div>
                        
                    </div>
                    <h3>Nouveau commentaire</h3>
            <form className='form_contact' onSubmit={onSubmit}>
                        {/* <div class="form-group">
                            <label for="exampleInputEmail1">Votre nom</label>
                            <input type="text" class="form-control" id="id_nom_author" aria-describedby="emailHelp" placeholder="Votre nom"></input>
                        </div> */}
                        <div class="form-group">
                            <input type="text" className="form-control" id="id_message" placeholder="Ecrire votre commentaire ici"></input>
                        </div>
                        <button type="submit" className='button'>Ajouter un commentaire</button>
                    </form>
            </div>
        </div>
    );
};

export default Task;
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, Input, InputGroup, InputGroupText, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';

const ListTask = () => {
    const [todos, setTodos] =useState([]);
    const [isLoading, setIsloading] = useState(true);
    const [isOpen, setOpen] = React.useState(
        JSON.parse(localStorage.getItem('is-open')) || false
    );

    useEffect(() => {
        localStorage.setItem('is-open', JSON.stringify(isOpen));
    }, [isOpen]);

    useEffect(()=>{
        axios.get(`https://dummyjson.com/todos`)
            .then(res => { 
                // console.log(res.data);
                setTodos(res.data.todos);
                localStorage.setItem('todos', JSON.stringify(res.data));
                setIsloading(false);
            })
    }, []);

    const deleteById = id => {
        setTodos(oldValues => {
          return oldValues.filter(todo => todo.id !== id)
        })
      }


    return (

        
        <div>
            {isLoading ? (
                <Spinner
                    className="m-5"
                    color="primary"
                >
                    Loading...
              </Spinner>
            ) : (
            <div className='container'>
                <h1>Liste de mes tâches</h1>
                {todos.map(todo => (
                            <ul className='todo' key={todo.id}>
                                <InputGroup>
                                    <InputGroupText>
                                    <Button className='bouton'>
                                        <Link to={`/task/${todo.id}`}>Voir la tâche</Link>
                                    </Button>
                                    </InputGroupText>
                                    <Input placeholder={todo.todo} />
                                    <Button className='btn-supp' id={todo.id} onClick={() => deleteById(todo.id)}>
                                        Supprimer tache
                                    </Button>
                                </InputGroup>
                                                              
                            </ul>
                            
                        ))}
            </div>
            )}
        </div>
    );
};

export default ListTask;
import {Link} from 'react-router-dom';
import image from '../img/img_header.jpg';

const Nav = () => {
    return (
        <div >
            <nav className='menu_navigation'>
                <img className='mon_image' src={image}></img>
                <ul className='container'>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/tasks">Tâches</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
        
    );
};

export default Nav;
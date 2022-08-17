import React from 'react';
import {FaDoorOpen} from 'react-icons/fa';
import {BiHome} from "react-icons/bi";
import '../../styles/Navbar.scss';

const navBar = () => {

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    }
    const handleHome = (e) => {
        e.preventDefault();
        window.location.href = '/trending';
    }

    return (
        <div className="navbar">
           <div className="nav-btn"><button title="Accueil" onClick={handleHome}><BiHome id="home-btn"/></button></div>

            <div className="nav-btn"><button title="Se déconnecter" onClick={handleLogout}><FaDoorOpen id="logout-btn"/></button></div>

        </div>
    );
};

export default navBar;
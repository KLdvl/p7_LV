import React from 'react';
import CreateProfil from "../components/profil/CreateProfil";
import Header from "../components/Header";
import Navbar from '../components/Navbar';
import "../styles/profil.scss";

const Profil = () => {
    return (
        <div className="profil-page">
            <Header/>
            <CreateProfil/>
        </div>
    );
};

export default Profil;
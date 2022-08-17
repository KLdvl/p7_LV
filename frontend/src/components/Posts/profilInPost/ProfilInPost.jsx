import React, {useEffect, useState} from 'react';
import axios from "axios";

const ProfilInPost = ({profilId}) => {
    const [profil, setProfil] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const parsedStorage = JSON.parse(localStorage.user)

    useEffect(()=> {getProfil()}, [])

    const getProfil = () => {
        axios({
                method: "get",
                mode: "cors",
                headers: {Authorization: `token ${parsedStorage.token}`},
                url: `${process.env.REACT_APP_API_URL}api/profil/${profilId}`,
            })
                .then(res => {

                    setProfil(res.data)
                    setLoading(false)
                })
                .catch(error => console.log(error))

        }

        if(isLoading && !profil) {
            return <div>Loading...</div>
        }
    return (
        <div className="profile-container">
            <img src={profil.profilPicture} className="profilPicture" alt="votre profil"/>
            <p className="nom">{profil.nom}</p>
            <p className="prenom">{profil.prenom}</p>
        </div>
    );
};

export default ProfilInPost;
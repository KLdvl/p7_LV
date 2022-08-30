import React, {useState, useEffect} from 'react';
// import UploadImage from "./UploadImage";
import axios from "axios";

const CreateProfil = () => {
    const [state, setState] = useState({
        prenom: "",
        nom: "",
        bio: "",
    })

    const [image, setImage] = useState(undefined)
    const [imageURL, setImageURL] = useState()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!image) return;
        setImageURL(URL.createObjectURL(image))
    }, [image])

    const onImageChange = (e) => {
        setImage(...e.target.files)
        setShow(!show)
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedStorage = JSON.parse(localStorage.user)

        axios({
            method: "post",
            mode: "cors",
            headers: {
                Authorization: `token ${parsedStorage.token}`,
                "Content-Type": "multipart/form-data"
            },
            url: `${process.env.REACT_APP_API_URL}api/profil`,
            data: {
                userId: parsedStorage.userId,
                prenom: state.prenom,
                nom: state.nom,
                bio: state.bio,
                profilPicture: image

            }
        })
            .then((res) => {
                if (res.data.errors) {
                    console.log(res.data.errors)
                } else {
                    window.location = "/Trending"
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="profil-container">
            <h1 className="title">Votre profil</h1>

            <form action="" onSubmit={handleSubmit} className="profil-form-container">
                <div className="form-column">
                    <label htmlFor="prenom">Votre prénom</label>
                    <input type="text"
                           name="prenom"
                           id="prenom"
                           onChange={handleChange}
                           value={state.prenom}
                    />
                    <label htmlFor="nom">Votre nom</label>
                    <input type="text"
                           name="nom"
                           id="nom"
                           onChange={handleChange}
                           value={state.nom}
                    />
                    <label htmlFor="bio">Votre description</label>
                    <textarea className="textAreaBio" name="bio" id="bio" onChange={handleChange} value={state.bio}/>
                </div>
                <div className="photo-profil">
                    <h3>Votre photo de profil</h3>
                    {show ? <img id="profil-pic" src={imageURL} alt="votre fichier"/> : null}
                    <br/>
                    <label htmlFor="file" className="image-btn">Choisir une image</label>
                    <input id="file" type="file" accept="image/*" onChange={onImageChange}/>
                    <input type="submit" value="enregistrer mon profil" id="sendBtn"/>
                </div>

            </form>


        </div>
    );
};

export default CreateProfil;
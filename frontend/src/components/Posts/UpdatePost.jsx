import React, {useEffect, useState} from 'react';
import axios from 'axios';
import "../../styles/updatePost.scss";


const UpdatePost = ({post}) => {
    console.log(post)

    const [state, setState] = useState({
        message: post.message
    })

    const parsedStorage = JSON.parse(localStorage.user)

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

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

    const handleModification = () => {
        axios({
            method: "PUT",
            mode: "cors",
            headers: {
                Authorization: `token ${parsedStorage.token}`,
                "Content-Type": "multipart/form-data",
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
            data: {
                userId: parsedStorage.userId,
                message: state.message,
                postPicture: image
            }
        })
            .then(window.location = "/trending")
    }

    return (
        <div>
            <div className="modify-post">
                <h3>Modifiez votre post ici:</h3>
                <textarea className="modify-textarea" name="message" id="message" value={state.message}
                    onChange={handleChange} cols="50" rows="50"/>
                {/*<input className="modify-file" type="file"/>               */}
                <div className="picture">
                    <h3>Votre photo</h3>
                    {show ? <img id="profil-pic" src={imageURL} alt="votre fichier"/> : null}
                    <input className="fileInput" type="file" accept="image/*" onChange={onImageChange}/>
                </div>
                <button onClick={handleModification}>Envoyer la modification</button>
            </div>
        </div>
    );
}


export default UpdatePost;
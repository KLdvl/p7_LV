import React from 'react';
import axios from 'axios';
import {BiDislike} from "react-icons/bi";

const DislikeInPost = ({post, reload}) => {
    const parsedStorage = JSON.parse(localStorage.user)
    const reloadComponent = () => {
        reload()
    }

    const dislikePost = () => {
        const initialLoad = {
            postId: post._id,
            userId: parsedStorage.userId
        }
        let payload = post.usersDisliked.includes(parsedStorage.userId) ?
            {...initialLoad, like: 0} : {...initialLoad, like: -1}

        axios({
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${post._id}/like`,
            data: payload
        })
            .then(post.usersLiked.includes(parsedStorage.userId) ? null : reloadComponent())
    }

    return (
        <div className="dislikes">
            <i onClick={dislikePost}><BiDislike/></i>
            <p>{post.dislikes} dislikes</p>
        </div>
    );
};

export default DislikeInPost;
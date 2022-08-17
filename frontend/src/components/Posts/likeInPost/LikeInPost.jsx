import React, {useState} from 'react';
import axios from 'axios';
import {BiLike} from 'react-icons/bi';

const LikeInPost = ({post, reload}) => {
    const parsedStorage = JSON.parse(localStorage.user)
    const reloadComponent = () => {
        reload()
    }

    const likePost = () => {
        const initialLoad = {
            postId: post._id,
            userId: parsedStorage.userId
        }
        let payload = post.usersLiked.includes(parsedStorage.userId) ?
            {...initialLoad, like: 0} : {...initialLoad, like: 1}

        axios({
            method: 'POST',
            mode: 'cors',
            headers: {
                Authorization: `token ${parsedStorage.token}`
            },
            url: `${process.env.REACT_APP_API_URL}api/post/${post._id}/like`,
            data: payload
        })
            .then(post.usersDisliked.includes(parsedStorage.userId) ? null : reloadComponent())
    }

    return (
        <div className="likes">
            <i onClick={likePost}><BiLike/></i>
            <p>{post.likes} likes</p>
        </div>
    );
};

export default LikeInPost;
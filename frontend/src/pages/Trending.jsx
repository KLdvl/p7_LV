import React from 'react';
import Header from '../components/Header';
import CreatePost from '../components/Posts/CreatePost';
import Navbar from '../components/Navbar';
import ModelPosts from "../components/Posts/modelPosts";


const Trending = () => {
    return (
        <div>
            <Header/>
            <Navbar/>
            <CreatePost/>
            <ModelPosts/>
        </div>
    );
};

export default Trending;
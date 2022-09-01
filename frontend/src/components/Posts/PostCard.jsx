// import React, {useState} from "react";
//
// import axios from 'axios';
// import ProfilInPost from "./profilInPost/ProfilInPost";
// import LikeInPost from "./likeInPost/LikeInPost";
// import DislikeInPost from './dislikeInPost/DislikeInPost';
// import UpdatePost from "./UpdatePost";
// import '../../styles/createPost.scss';
//
// const PostCard = (props) => {
//     const parsedStorage = JSON.parse(localStorage.user)
//     const userId = parsedStorage.userId
//     const [isShown, setIsShown] = useState(false)
//     const [isIndex, setIsIndex] = useState(null)
//
//     const displayPost = (props) => {
//         const {posts} = props;
//         if (posts.length > 0) {
//             return (posts.map((post, index) => {
//
//                 const handleShow = () => {
//                     setIsShown(current => !current)
//                     setIsIndex(index)
//                 }
//                 const deletePost = () => {
//                     axios({
//                         method: "DELETE",
//                         mode: "cors",
//                         headers: {
//                             Authorization: `token ${parsedStorage.token}`
//                         },
//                         url: `${process.env.REACT_APP_API_URL}api/post/${post._id}`,
//                         data: {id: post._id}
//                     })
//                         .then(window.location = "/trending")
//                 }
//
//                 return (
//                     <div className="post-container" key={post._id}>
//                         <ProfilInPost className="profile-container" key={post._id} profilId={post.userId}/>
//                         <div className="messagePost">{post.message}</div>
//                         {post.postPicture ?
//                             <img className="picture" src={post.postPicture} alt=""/> : null}
//                         <div className="likeBar">
//                             <LikeInPost post={post}/>
//                             <DislikeInPost post={post}/>
//                         </div>
//                         {(userId === post.userId || parsedStorage.role === "Admin") &&
//                         <div>
//                             <button className="modifierBtn" onClick={handleShow}>Modifier</button>
//                             <button className="deleteBtn" onClick={deletePost}>Supprimer</button>
//                             {isShown && index === isIndex && <UpdatePost post={post}/>}
//                         </div>}
//                             <p className="timestamp">Publié le : {new Date(post.date).toLocaleDateString()}</p>
//                     </div>
//                 )
//
//             }))
//         } else {
//             return (
//                 <div>
//                     <p>
//                         Pas de post à afficher!
//                     </p>
//                 </div>
//             )
//         }
//     }
//     return (
//         <div>
//             {displayPost(props)}
//         </div>
//     );
// };
//
// export default PostCard;
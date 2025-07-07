import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../contextapi/authContext";

const Single = () => {
  const [post, setPost] = useState({});

  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location);
  const postId = location.pathname.split("/")[2];
  // console.log(post.img);
  const { currentUser } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/posts/${postId}`,
        { withCredentials: true }
      );
      setPost(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/posts/${postId}`,
        { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post?.userImg} alt="" />}
          <div className="info">
            <span>{post?.username}</span>
            <p>posted {moment(post.date).fromNow()}.</p>
          </div>
          {currentUser?.username == post?.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post?.title}</h1>
        {getText(post?.des)}
      </div>
      <Menu cat={post.cat}/>
    </div>
  );
};

export default Single;

// 39:01

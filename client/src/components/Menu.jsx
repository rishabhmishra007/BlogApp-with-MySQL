import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/posts/?cat=${cat}`);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  // const posts = [
  //   {
  //     id: 1,
  //     title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ea, molestiae rerum corporis veniam natus.",
  //     img: "https://picsum.photos/200",
  //   },
  //   {
  //     id: 2,
  //     title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     desc: "Lorem sjve vsd viwi ve ifceirfher eo0uefr ipsum dolor sit amet consectetur adipisicing elit. Quaerat ea, molestiae rerum corporis veniam natus.",
  //     img: "https://picsum.photos/300",
  //   },
  //   {
  //     id: 3,
  //     title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ea, molestiae rerum corporis veniam natus.",
  //     img: "https://picsum.photos/400",
  //   },
  // ];

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <h2>{post.title}</h2>
          <button>Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;

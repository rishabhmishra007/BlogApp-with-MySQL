import axios from "axios";
import moment from "moment";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  // console.log(state);

  const [value, setValue] = useState(state?.des || "");
  const [title, setTitle] = useState(state?.title || "");
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  // console.log(value, cat, title, img);

  const Categories = [
    { id: 1, name: "art" },
    { id: 2, name: "science" },
    { id: 3, name: "technology" },
    { id: 4, name: "cinema" },
    { id: 5, name: "design" },
    { id: 6, name: "food" },
  ];

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", img);
      const res = await axios.post(
        "http://localhost:8000/api/v1/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      if (state) {
      await axios.put(
        `http://localhost:8000/api/v1/posts/${state.id}`,
        {
          title,
          des: value,
          cat,
          img: img ? imgUrl : "",
        },
        { withCredentials: true }
      );
    } else {
      await axios.post(
        "http://localhost:8000/api/v1/posts/",
        {
          title,
          des: value,
          cat,
          img: img ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        },
        { withCredentials: true }
      );
    }
    navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {Categories?.map((item) => (
            <div className="cat" key={item.id}>
              <input
                type="radio"
                checked={cat === item.name}
                value={item.name}
                id={item.name}
                name="cat"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor={item.name}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Write;

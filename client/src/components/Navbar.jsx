import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../contextapi/authContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <NavLink className="link" id="h6" to="/?cat=art">
            Art
          </NavLink>
          <NavLink className="link" id="h6" to="/?cat=science">
            Science
          </NavLink>
          <NavLink className="link" id="h6" to="/?cat=technology">
            Technology
          </NavLink>
          <NavLink className="link" id="h6" to="/?cat=cinema">
            Cinema
          </NavLink>
          <NavLink className="link" id="h6" to="/?cat=design">
            Design
          </NavLink>
          <NavLink className="link" id="h6" to="/?cat=food">
            Food
          </NavLink>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
         {currentUser && <span className="write">
            <NavLink className="link" to="/write">
              Write
            </NavLink>
          </span>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

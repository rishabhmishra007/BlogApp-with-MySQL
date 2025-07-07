import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        inputs,
        { withCredentials: true }
      );
      setCurrentUser(res.data);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:8000/api/v1/auth/logout",
      {},
      { withCredentials: true }
    );
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

import { db } from "../db.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const q = "SELECT * FROM user WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.name], async (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("user already exists.");

    try {
      const hash = await argon2.hash(req.body.password);

      const q = "INSERT INTO user(username, email, password) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("user has been created successfully!");
      });
    } catch (error) {
      return res.status(500).json("Error hashing password");
    }
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM user WHERE username = ?";
  const {username} = req.body;
  db.query(q, [username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("user not found!");

    try {
      const checkPassword = await argon2.verify(data[0].password, req.body.password);
      if (!checkPassword)
        return res.status(400).json("wrong username or password");

      const token = jwt.sign({ id: data[0].id }, "jwtsecret");
      const {password, ...other} = data[0];

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(other);
    } catch (error) {
      return res.status(500).json("Error wrong password or username");
    }
  });
};

export const logout = (req, res) => {
  try {
    res.clearCookie("access_token", {
        sameSite: "lax",
        secure: false
    }).status(200).json("User Logged out successfully.")
  } catch (error) {
    return res.status(500).json("Error in logout");
  }
};

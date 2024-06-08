import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const UserProfile = () => {
  const { authState, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    } else {
      setFormData({
        name: authState.user.name,
        email: authState.user.email,
        password: "",
      });
    }
  }, [authState, navigate]);

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:3000/api/users",
        { name, email, password },
        {
          headers: { "x-auth-token": localStorage.getItem("token") },
        }
      );
      alert("Profile updated successfully");
      logout();
      navigate("/login");
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const deleteUserAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete("http://localhost:3001/api/users", {
          headers: { "x-auth-token": localStorage.getItem("token") },
        });
        logout();
        navigate("/register");
      } catch (err) {
        console.error(
          "Error deleting account:",
          err.response ? err.response.data : err.message
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-2xl mt-4">User Profile</h1>
      <form
        onSubmit={onSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-lg mt-4"
      >
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
          required
          className="mb-4 p-2 border rounded w-full"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Profile
        </button>
      </form>
      <button
        onClick={deleteUserAccount}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Delete Account
      </button>
    </div>
  );
};

export default UserProfile;

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl">Travel Itinerary Planner</h1>
      <nav>
        {authState.isAuthenticated ? (
          <>
            <Link to="/dashboard" className="mr-4">
              Dashboard
            </Link>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="mr-4">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;

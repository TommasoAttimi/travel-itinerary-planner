import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl mb-4">Travel Itinerary Planner</h1>
    <div>
      <Link to="/login" className="mr-4 text-blue-500">
        Login
      </Link>
      <Link to="/register" className="text-blue-500">
        Register
      </Link>
    </div>
  </div>
);

export default Home;

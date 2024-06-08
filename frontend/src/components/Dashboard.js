import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import ItineraryList from "./ItineraryList";
import Modal from "./Modal";

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const [itineraries, setItineraries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/login");
    } else {
      fetchItineraries();
    }
  }, [authState, navigate]);

  const fetchItineraries = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/itineraries", {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      setItineraries(res.data);
    } catch (err) {
      console.error(
        "Error fetching itineraries:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-2xl mt-4">
        Welcome, {authState.user && authState.user.name}
      </h1>
      <button
        onClick={() => setShowModal(true)}
        className="mt-2 bg-blue-500 text-white p-2 rounded"
      >
        Create Itinerary
      </button>
      <ItineraryList
        itineraries={itineraries}
        setItineraries={setItineraries}
      />
      {showModal && (
        <Modal setShowModal={setShowModal} setItineraries={setItineraries} />
      )}
    </div>
  );
};

export default Dashboard;

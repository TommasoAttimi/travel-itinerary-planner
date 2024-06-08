import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

const ItineraryDetails = ({ itinerary, removeItinerary, updateItinerary }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const deleteItinerary = async () => {
    if (window.confirm("Are you sure you want to delete this itinerary?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/itineraries/${itinerary._id}`,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          }
        );
        removeItinerary(itinerary._id);
      } catch (err) {
        console.error(
          "Error deleting itinerary:",
          err.response ? err.response.data : err.message
        );
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl">{itinerary.title}</h2>
      <p>{itinerary.description}</p>
      <p>
        <strong>Start Date:</strong>{" "}
        {new Date(itinerary.startDate).toLocaleDateString()}
      </p>
      <p>
        <strong>End Date:</strong>{" "}
        {new Date(itinerary.endDate).toLocaleDateString()}
      </p>
      <h3 className="mt-2">Locations:</h3>
      <ul>
        {itinerary.locations.map((location, index) => (
          <li key={index} className="mb-2">
            <p>
              <strong>Name:</strong> {location.name}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(location.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Notes:</strong> {location.notes}
            </p>
            {location.photos &&
              location.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:3000${photo}`}
                  alt={`Location ${idx}`}
                  className="location-photo"
                />
              ))}
          </li>
        ))}
      </ul>
      <button
        onClick={deleteItinerary}
        className="mt-2 bg-red-500 text-white p-2 rounded"
      >
        Delete Itinerary
      </button>
      <button
        onClick={() => setShowEditModal(true)}
        className="mt-2 bg-yellow-500 text-white p-2 rounded"
      >
        Edit Itinerary
      </button>
      {showEditModal && (
        <Modal
          setShowModal={setShowEditModal}
          itinerary={itinerary}
          updateItinerary={updateItinerary}
        />
      )}
    </div>
  );
};

export default ItineraryDetails;

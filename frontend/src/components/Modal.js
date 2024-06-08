import React, { useState, useEffect } from "react";
import ItineraryForm from "./ItineraryForm";

const Modal = ({
  setShowModal,
  itinerary,
  setItineraries,
  updateItinerary,
}) => {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-lg">
        <button
          onClick={handleClose}
          className="float-right bg-red-500 text-white p-2 rounded"
        >
          Close
        </button>
        <ItineraryForm
          itinerary={itinerary}
          setItineraries={setItineraries}
          updateItinerary={updateItinerary}
          setShowModal={setShowModal}
        />
      </div>
    </div>
  );
};

export default Modal;

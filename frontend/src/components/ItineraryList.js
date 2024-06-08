import React from "react";
import ItineraryDetails from "./ItineraryDetails";

const ItineraryList = ({ itineraries, setItineraries }) => {
  const removeItinerary = (id) => {
    setItineraries(itineraries.filter((itinerary) => itinerary._id !== id));
  };

  const updateItinerary = (updatedItinerary) => {
    setItineraries(
      itineraries.map((itinerary) =>
        itinerary._id === updatedItinerary._id ? updatedItinerary : itinerary
      )
    );
  };

  return (
    <div className="w-full max-w-lg mt-4">
      {itineraries.map((itinerary) => (
        <ItineraryDetails
          key={itinerary._id}
          itinerary={itinerary}
          removeItinerary={removeItinerary}
          updateItinerary={updateItinerary}
        />
      ))}
    </div>
  );
};

export default ItineraryList;

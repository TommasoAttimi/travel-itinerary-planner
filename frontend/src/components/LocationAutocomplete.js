import React, { useState } from "react";
import { LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import config from "../config"; // Import the config

const libraries = ["places"];

const LocationAutocomplete = ({ onSelect }) => {
  const [searchBox, setSearchBox] = useState(null);

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const location = {
        description: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      onSelect(location);
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={config.googleMapsApiKey}
      libraries={libraries}
      loadingElement={<div>Loading...</div>}
    >
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Search a location"
          className="mb-2 p-2 border rounded w-full"
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default LocationAutocomplete;

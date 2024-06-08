import React, { useState, useEffect } from "react";
import axios from "axios";
import LocationAutocomplete from "./LocationAutocomplete";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import config from "../config"; // Import the config

const ItineraryForm = ({
  itinerary,
  setItineraries,
  updateItinerary,
  setShowModal,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    locations: [
      {
        name: "",
        date: "",
        notes: "",
        photos: [],
        link: "",
        lat: null,
        lng: null,
      },
    ],
  });

  useEffect(() => {
    if (itinerary) {
      const formattedItinerary = {
        ...itinerary,
        startDate: itinerary.startDate.split("T")[0],
        endDate: itinerary.endDate.split("T")[0],
        locations: itinerary.locations.map((location) => ({
          ...location,
          date: location.date.split("T")[0],
        })),
      };
      setFormData(formattedItinerary);
    }
  }, [itinerary]);

  const { title, description, startDate, endDate, locations } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onLocationChange = (index, e) => {
    const newLocations = [...locations];
    newLocations[index][e.target.name] = e.target.value;
    setFormData({ ...formData, locations: newLocations });
  };

  const onLocationSelect = (index, { description, lat, lng }) => {
    const newLocations = [...locations];
    newLocations[index] = {
      ...newLocations[index],
      name: description,
      lat,
      lng,
    };
    setFormData({ ...formData, locations: newLocations });
  };

  const addLocation = () => {
    setFormData({
      ...formData,
      locations: [
        ...locations,
        {
          name: "",
          date: "",
          notes: "",
          photos: [],
          link: "",
          lat: null,
          lng: null,
        },
      ],
    });
  };

  const onFileChange = (index, e) => {
    const files = Array.from(e.target.files);
    const newLocations = [...locations];
    newLocations[index].photos = files;
    setFormData({ ...formData, locations: newLocations });
  };

  const uploadFileToFirebase = async (file) => {
    const storageRef = ref(storage, `photos/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const photoUrlsPromises = formData.locations.flatMap((location) =>
      location.photos.map((photo) => uploadFileToFirebase(photo))
    );
    const photoUrls = await Promise.all(photoUrlsPromises);

    const updatedLocations = formData.locations.map((location, index) => ({
      ...location,
      photos: photoUrls.slice(
        index * location.photos.length,
        (index + 1) * location.photos.length
      ),
    }));

    const formDataToSubmit = {
      title: formData.title,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      locations: updatedLocations,
    };

    try {
      if (itinerary) {
        const res = await axios.put(
          `http://localhost:3000/api/itineraries/${itinerary._id}`,
          formDataToSubmit,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        updateItinerary(res.data);
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/itineraries",
          formDataToSubmit,
          {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
              "Content-Type": "application/json",
            },
          }
        );
        setItineraries((itineraries) => [...itineraries, res.data]);
      }
    } catch (err) {
      console.error(
        "Error creating/updating itinerary:",
        err.response ? err.response.data : err.message
      );
    }

    setShowModal(false);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg mt-4">
      <input
        type="text"
        name="title"
        value={title}
        onChange={onChange}
        placeholder="Title"
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <textarea
        name="description"
        value={description}
        onChange={onChange}
        placeholder="Description"
        className="mb-2 p-2 border rounded w-full"
      ></textarea>
      <input
        type="date"
        name="startDate"
        value={startDate}
        onChange={onChange}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      <input
        type="date"
        name="endDate"
        value={endDate}
        onChange={onChange}
        required
        className="mb-2 p-2 border rounded w-full"
      />
      {locations.map((location, index) => (
        <div key={index} className="mb-2">
          <LocationAutocomplete
            onSelect={(location) => onLocationSelect(index, location)}
          />
          <input
            type="text"
            name="name"
            value={location.name}
            onChange={(e) => onLocationChange(index, e)}
            placeholder="Location Name"
            required
            className="mb-2 p-2 border rounded w-full"
          />
          <input
            type="date"
            name="date"
            value={location.date}
            onChange={(e) => onLocationChange(index, e)}
            required
            className="mb-2 p-2 border rounded w-full"
          />
          <textarea
            name="notes"
            value={location.notes}
            onChange={(e) => onLocationChange(index, e)}
            placeholder="Notes"
            className="mb-2 p-2 border rounded w-full"
          ></textarea>
          <input
            type="file"
            multiple
            onChange={(e) => onFileChange(index, e)}
            className="mb-2 p-2 border rounded w-full"
          />
          <div className="flex flex-wrap">
            {location.photos &&
              location.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(photo)}
                  alt={`Location ${idx}`}
                  className="mb-2 w-24 h-24 object-cover mr-2"
                />
              ))}
          </div>
          <input
            type="text"
            name="link"
            value={location.link}
            onChange={(e) => onLocationChange(index, e)}
            placeholder="Link"
            className="mb-2 p-2 border rounded w-full"
          />
          {location.lat && location.lng && (
            <LoadScript
              googleMapsApiKey={config.googleMapsApiKey}
              libraries={["places"]}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={{ lat: location.lat, lng: location.lng }}
                zoom={10}
              >
                <Marker position={{ lat: location.lat, lng: location.lng }} />
              </GoogleMap>
            </LoadScript>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addLocation}
        className="mb-2 bg-blue-500 text-white p-2 rounded w-full"
      >
        Add Location
      </button>
      <button
        type="submit"
        className="bg-green-500 text-white p-2 rounded w-full"
      >
        {itinerary ? "Update Itinerary" : "Create Itinerary"}
      </button>
    </form>
  );
};

export default ItineraryForm;

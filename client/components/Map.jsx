import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import SearchBar from './SearchBar.jsx';
import '../styles.css'

const Map = ({ selectedLocation }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
      <GoogleMap zoom={10} center={selectedLocation || { lat: 37.7749, lng: -122.45 }} mapContainerClassName="map">
        {selectedLocation && (
          <Marker
            position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
            label="A"
            animation={window.google.maps.Animation.DROP}
            draggable={true}
          >
            {/* <InfoWindow>
              <div>
                InfoWindow content goes here.
              </div>
            </InfoWindow> */}
          </Marker>
        )}
      </GoogleMap>
  );
}

export default Map;

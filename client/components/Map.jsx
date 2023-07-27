import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import '../styles.css';

const Map = ({ selectedLocation, reviews }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY
  });
  const center = { lat: 37.7749, lng: -122.45 };
  const [userLocation, setUserLocation] = useState(null);

   // if browser geolocation is allowed, then set userLocation to coordinates
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location', error);
        }
      );
    }
  }, []);

  // const reviews = () => {
  //   try {
  //     const { formatted_address } = selectedLocation
  //     const response = await fetch('/api/getReviews', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: { formatted_address }
  //     })
  //     console.log(response)
  //     return response;
  //   } catch (error) {
  //     console.error('Error getting user location', error);
  //   }
    

  if (!isLoaded) return <div>Loading...</div>;

  return (
      <GoogleMap zoom={10} center={selectedLocation || userLocation || center} mapContainerClassName="map">
          <Marker
            position={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : userLocation || center}
            title="You are here."
            animation={window.google.maps.Animation.DROP}
            draggable={true}
            icon={'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'}
          >
            {selectedLocation && (
            <InfoWindow position={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : null}>
              <div>
                This is where the name would go <br/>
                {selectedLocation.formatted_address}<br/>
                Reviews would go here
                {/* {reviews} */}
              </div>
            </InfoWindow>
            )}
          </Marker>
      </GoogleMap>
  );
}

export default Map;

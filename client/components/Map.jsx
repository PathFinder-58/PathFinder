import React, {useState, useEffect, useRef} from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"

const libraries = ['places'];

const Map = () => {
  const { isLoaded, loadError, loadScriptSuccess } = useLoadScript({
    googleMapsApiKey: process.env.API_KEY,
    libraries,
  })
  const center = { lat: 37.7749, lng: -122.45 };
  const [userLocation, setUserLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);
  const mapRef = useRef(null);
  const placesServiceRef = useRef(null);

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
  
    
    useEffect(() => {
      if (userLocation) {
        // Check if the Google Maps API is loaded and the PlacesService is available
        if (isLoaded && loadScriptSuccess) {
          placesServiceRef.current = new window.google.maps.places.PlacesService(mapRef.current);
          // Function to fetch nearby wheelchair-accessible locations
          const fetchNearbyPlaces = async () => {
            try {
              const request = {
                location: new window.google.maps.LatLng(userLocation.lat, userLocation.lng),
                radius: 5000,
                keyword: 'wheelchair accessible',
                type: ['establishment'],
              };
              const response = await new Promise((resolve, reject) => {
                placesServiceRef.current.nearbySearch(request, (results, status) => {
                  if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    resolve(results);
                  } else {
                    reject(status);
                  }
                });
              });
              setPlaces(response);
            } catch (error) {
              console.error('Error fetching nearby wheelchair-accessible places', error);
            }
          };
  
          fetchNearbyPlaces();
        }
      }
    }, [userLocation, isLoaded, loadScriptSuccess]);
  



    const handleMarkerClick = (place) => {
      setIsInfoWindowOpen(true);
      setSelectedPlace(place);
    };

    const handleInfoWindowClose = () => {
      setIsInfoWindowOpen(false);
      setSelectedPlace(null);
    };


    // Handle cases of load error, or loading
    if (loadError) {
      return <div>Error loading Google Maps API</div>;
    }
  
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
  

    return (
      <div className='wrapper'>
        <GoogleMap zoom={15} center={userLocation || center} mapContainerClassName='map' ref={mapRef}>
          {places.map((place) => (
            <Marker
              key={place.place_id}
              position={{ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }}
              onClick={() => handleMarkerClick(place)}
            />
          ))}
  
          {userLocation && (
            <Marker
              position={userLocation}
              title='You Are Here'
              animation={window.google.maps.Animation.DROP}
              draggable={true}
              onClick={() => handleMarkerClick('You Are Here')}
              icon={'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'}
            />
          )}
  
          {isInfoWindowOpen && selectedPlace && (
            <InfoWindow onCloseClick={handleInfoWindowClose} position={userLocation}>
              <div>
                <h3>{selectedPlace.name}</h3>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    );
  };
  
  export default Map;
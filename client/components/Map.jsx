import React, {useState} from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'PLACEHOLDER FOR ACTUAL KEY!!!'
  })
  if (!isLoaded) return <div>Loading...</div>
  return (
    <div>
        <GMap />
    </div>
  )
}


function GMap() {
    const center = { lat: 37.7749, lng: -122.45 };
    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

    const handleMarkerClick = () => {
      setIsInfoWindowOpen(true);
    };

    const handleInfoWindowClose = () => {
      setIsInfoWindowOpen(false);
    };

    return (
      <div className='wrapper'>
        <GoogleMap zoom={10} center={center} mapContainerClassName="map">
          <Marker position={center} label='A' title='CodeSmith' animation={window.google.maps.Animation.DROP} draggable={true} onClick={handleMarkerClick}
          >
            {isInfoWindowOpen && (
            <InfoWindow onCloseClick={handleInfoWindowClose}>
              <div>
                InfoWindow content goes here.
              </div>
            </InfoWindow>
          )}

          </Marker>
          
        </GoogleMap>
      </div>
    )
}


export default Map;
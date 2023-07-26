import React, { useState, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
// import "@reach/combobox/styles.css";

const Map = () => {
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: process.env.API_KEY, // use process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY and replace name in .env
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <GMap />;
}

function GMap() {
    const center = useMemo(() => ({ lat: 37.7749, lng: -122.45 }), []);
    const [selected, setSelected] = useState(null);
    const [isInfoWindowOpen, setIsInfoWindowOpen] = useState(false);

    const handleMarkerClick = () => {
      setIsInfoWindowOpen(true);
    };

    const handleInfoWindowClose = () => {
      setIsInfoWindowOpen(false);
    };

  return (
    <>
      <div className='places-container'>
        <PlacesAutocomplete setSelected={setSelected} />
      </div>
      <div className='wrapper'>
        <GoogleMap zoom={10} center={selected || center} mapContainerClassName="map">
          <Marker position={selected} label='A' title='You are here' animation={window.google.maps.Animation.DROP} draggable={true} onClick={handleMarkerClick}>
            {/* {isInfoWindowOpen && (
            <InfoWindow onCloseClick={handleInfoWindowClose}>
              <div>
                InfoWindow content goes here.
              </div>
            </InfoWindow>
            )} */}
          </Marker>
        </GoogleMap>
      </div>
    </>
  )
}

const PlacesAutocomplete = ({ setSelected }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className="combobox-input" placeholder="Search an address" />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export default Map;
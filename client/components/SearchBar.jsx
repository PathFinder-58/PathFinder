import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import '../styles.css';


const SearchBar = ({ onSelect }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define the options here if needed, such as restricting to specific countries */
    },
    debounce: 300,
  });
  
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (address) => async () => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { formatted_address, place_id } = results[0];
      const { lat, lng } = await getLatLng(results[0]);
      console.log(results[0]);
      onSelect({ lat, lng, formatted_address, place_id });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div className='searchbar'>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Enter a location"
      />
      {status === 'OK' && (
        <ul>
          {data.map((suggestion) => (
            <li className='suggestion' key={suggestion.place_id} onClick={handleSelect(suggestion.description)}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

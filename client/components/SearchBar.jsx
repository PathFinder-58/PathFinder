import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

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
  
  console.log('this is ready', ready);
  console.log('This is the suggestion data', data);
  console.log('This is the suggestions status', status);
  console.log('This is the value', value);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = (address) => async () => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelect({ lat, lng });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        // disabled={!ready}
        placeholder="Enter a location"
      />
      {status === 'OK' && (
        <ul>
          {data.map((suggestion) => (
            <li key={suggestion.place_id} onClick={handleSelect(suggestion.description)}>
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

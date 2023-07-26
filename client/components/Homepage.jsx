import React, { useState }  from 'react'
import Map from './Map.jsx'
import SideBar from './SideBar.jsx'
import '../styles.css'


const Homepage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const onSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className='wrapper'>
      <SideBar onSelect={onSelectLocation} selectedLocation={selectedLocation}/>
      <Map selectedLocation={selectedLocation} />
    </div>
  )
}

export default Homepage
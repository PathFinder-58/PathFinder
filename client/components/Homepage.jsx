import React, { useState }  from 'react'
import Map from './Map.jsx'
import SideBar from './SideBar.jsx'
import '../styles.css'


const Homepage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [reviews, setReviews] = useState(null)

  const onSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const getReviews = async (location) => {
    try {
      // const { formatted_address } = selectedLocation
      const response = await fetch('/api/getReviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { location }
      })
      console.log('response', response)
      const data = await response.json();
      console.log(data)
      setReviews(data)
    } catch (error) {
      console.error('Error getting reviews', error);
    }
  }

  return (
    <div className='wrapper'>
      <SideBar onSelect={onSelectLocation} selectedLocation={selectedLocation} getReviews={getReviews}/>
      <Map selectedLocation={selectedLocation} reviews={reviews} />
    </div>
  )
}

export default Homepage
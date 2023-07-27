import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import '../styles.css';
import { TextField, Box, Rating, Typography } from '@mui/material';
import Button from '@mui/material/Button';
// import { useState } from 'react';

const SideBar = ({ onSelect, selectedLocation, getReviews }) => {
  
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = React.useState(0);

  const submitReview = async (e) => {
    console.log('I am the rating: ', rating);
    console.log('I am the review\'s text: ', reviewText);
    // POST request to backend
    e.preventDefault();
    try {
      const { formatted_address } = selectedLocation;
      const response = await fetch('/api/submitReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText, formatted_address, rating }),
      });
      if (response.ok) {
        console.log('I am the successful response: ', response);
        console.log('Review Submitted!');
      } else {
        console.error('Error submitting review');
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="sidebar">
      <h1>PathFinder</h1>
      <div className='spacer'>
      <SearchBar onSelect={onSelect} getReviews={getReviews}/>
      <Box component="form">
        <Typography component="legend" className="ratings" >
          PathFinder Score: <Rating name="simple-controlled" value={rating} onChange={(event, newValue) => setRating(newValue)} />
        </Typography>
        <TextField
            id="outlined-multiline-static"
            label="Leave a review"
            multiline
            rows={4}
            className='comment'
            value = {reviewText} 
            onChange = {(e) => setReviewText(e.target.value)}
          />
          <Button onClick={submitReview} variant="contained">Submit Review</Button>
      </Box>
      
      </div>
      
    </div>
  );
};

export default SideBar;

import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import '../styles.css';
import { TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
// import { useState } from 'react';

const SideBar = ({ onSelect }) => {
  
const [reviewText, setReviewText] = useState('');

  const submitReview = async (e) => {
    console.log(reviewText);
    // POST request to backend
    e.preventDefault();
    try {
      const response = await fetch('/api/submitReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reviewText }),
      });
      if (response.ok) {
        console.log(response);
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
      <SearchBar onSelect={onSelect}/>
      <Box component="form">
        <TextField
            id="outlined-multiline-static"
            label="Leave a review"
            multiline
            rows={4}
            className='comment'
            value = {reviewText} 
            onChange = {(e) => setReviewText(e.target.value)}
            // sx={}
          />
          <Button onClick={submitReview} variant="contained">Submit Review</Button>
      </Box>
      
      </div>
      
    </div>
  );
};

export default SideBar;

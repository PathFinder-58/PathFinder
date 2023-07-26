import React, { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import '../styles.css';
import { TextField, Box } from '@mui/material';
import Button from '@mui/material/Button';
// import { useState } from 'react';

const SideBar = ({ onSelect }) => {
  
const [reviewText, setReviewText] = useState('');

  const submitReview = () => {
    console.log(reviewText);
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
